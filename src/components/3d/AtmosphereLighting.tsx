import React from 'react';

export const AtmosphereLighting: React.FC = () => {
  return (
    <>
      {/* Radiant Dubai Golden-Hour Sky & Distant Warm Haze */}
      <color attach="background" args={["#fde047"]} />
      
      {/* Soft golden horizon haze far in the distance - NEVER obscuring buildings */}
      <fog attach="fog" args={["#fed7aa", 80, 280]} />

      {/* Primary Radiant Golden Sun */}
      <directionalLight
        position={[60, 70, 45]}
        intensity={3.2}
        color="#ffedd5"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={300}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-bias={-0.0002}
      />

      {/* Generous Warm Sky Ambient Light for crystal-clear visibility */}
      <ambientLight intensity={1.6} color="#ffedd5" />

      {/* Azure Sky Hemisphere Light (Warm golden ground, crisp azure sky) */}
      <hemisphereLight
        color="#38bdf8"
        groundColor="#f59e0b"
        intensity={1.4}
      />

      {/* Radiant Fill Light from Western Horizon */}
      <directionalLight
        position={[-60, 40, -40]}
        intensity={1.5}
        color="#bae6fd"
      />

      {/* Central Plaza Illumination */}
      <pointLight position={[0, 20, 0]} intensity={2.5} distance={90} color="#ffffff" />
    </>
  );
};
