import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { SceneCheckpoint } from '../../types';
import { VehicleState } from '../../hooks/useVehicleControls';

interface CameraRigProps {
  currentScene: SceneCheckpoint;
  isDrivingMode: boolean;
  vehicleState: VehicleState;
}

// Module-level scratch vectors to prevent garbage collection stutter during continuous driving
const _tempCarPos = new THREE.Vector3();
const _tempCamTarget = new THREE.Vector3();
const _tempLookTarget = new THREE.Vector3();

export const CameraRig: React.FC<CameraRigProps> = ({
  currentScene,
  isDrivingMode,
  vehicleState
}) => {
  const currentPos = useRef(new THREE.Vector3(0, 92, 98));
  const currentTarget = useRef(new THREE.Vector3(0, 2, 0));
  const prevSceneIdRef = useRef<number>(currentScene.id);

  // GSAP Cinematic Scene Transitions for 3D Guided Tour
  useEffect(() => {
    if (isDrivingMode) return;

    if (prevSceneIdRef.current !== currentScene.id) {
      prevSceneIdRef.current = currentScene.id;

      const targetPos = new THREE.Vector3(...currentScene.cameraPosition);
      const targetLook = new THREE.Vector3(...currentScene.cameraTarget);

      gsap.to(currentPos.current, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      gsap.to(currentTarget.current, {
        x: targetLook.x,
        y: targetLook.y,
        z: targetLook.z,
        duration: 1.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  }, [currentScene, isDrivingMode]);

  useFrame((state, delta) => {
    const camera = state.camera as THREE.PerspectiveCamera;

    if (isDrivingMode) {
      // Elevated GTA V-Style Chase Camera
      const [carX, carY, carZ] = vehicleState.position;
      const rotY = vehicleState.rotationY;
      const speedNorm = Math.min(Math.abs(vehicleState.speed) / 14.0, 1.0);

      // Camera distance and elevation adjust dynamically with velocity
      const chaseDistance = 7.5 + speedNorm * 1.5;
      const chaseHeight = 2.2 + speedNorm * 0.4;

      const targetCamX = carX - Math.sin(rotY) * chaseDistance;
      const targetCamZ = carZ - Math.cos(rotY) * chaseDistance;
      const targetCamY = carY + chaseHeight;

      // Lookahead target down the road (smooth focus on front hood / asphalt horizon)
      const lookDist = 6.8;
      const targetLookX = carX + Math.sin(rotY) * lookDist;
      const targetLookY = carY + 0.95;
      const targetLookZ = carZ + Math.cos(rotY) * lookDist;

      _tempCamTarget.set(targetCamX, targetCamY, targetCamZ);
      _tempLookTarget.set(targetLookX, targetLookY, targetLookZ);

      // Smooth camera dampening with frame-rate independent lerp
      currentPos.current.lerp(_tempCamTarget, Math.min(delta * 5.0, 1.0));
      currentTarget.current.lerp(_tempLookTarget, Math.min(delta * 6.0, 1.0));

      // Dynamic Speed FOV expansion (45 to 54 deg)
      const targetFov = 45 + speedNorm * 8.0;
      if (Math.abs(camera.fov - targetFov) > 0.1) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, delta * 3.0);
        camera.updateProjectionMatrix();
      }

      camera.position.copy(currentPos.current);
      camera.lookAt(currentTarget.current);
    } else {
      // Reset FOV for cinematic tour overview
      if (Math.abs(camera.fov - 45) > 0.1) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, 45, delta * 2.5);
        camera.updateProjectionMatrix();
      }

      // Cinematic aerial bird's-eye panorama for Scene 01 (Utkarsh City Top View)
      if (currentScene.id === 1) {
        const driftX = Math.sin(state.clock.elapsedTime * 0.08) * 14;
        const driftZ = Math.cos(state.clock.elapsedTime * 0.08) * 7;
        camera.position.set(
          currentPos.current.x + driftX,
          currentPos.current.y,
          currentPos.current.z + driftZ
        );
      } else {
        camera.position.copy(currentPos.current);
      }
      camera.lookAt(currentTarget.current);
    }
  });

  return null;
};
