import React from 'react';

export const AtmosphereLighting: React.FC = () => {
  return (
    <>
      {/* Radiant Dubai Golden-Hour Atmosphere Sky */}
      <color attach="background" args={["#bae6fd"]} />
      
      {/* Soft natural azure horizon haze far in the distance */}
      <fog attach="fog" args={["#bae6fd", 160, 450]} />

      {/* Primary Radiant Golden Sun */}
      <directionalLight
        position={[60, 75, 50]}
        intensity={3.2}
        color="#fff7ed"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={320}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-bias={-0.0002}
      />

      {/* Warm Ambient Light for Crystal-Clear Visibility */}
      <ambientLight intensity={1.8} color="#ffffff" />

      {/* Azure Sky & Golden Ground Hemisphere Light */}
      <hemisphereLight
        color="#7dd3fc"
        groundColor="#fed7aa"
        intensity={1.5}
      />

      {/* Western Horizon Warm Sun Flare Fill */}
      <directionalLight
        position={[-60, 45, -45]}
        intensity={1.6}
        color="#fef08a"
      />

      {/* Central Plaza Illumination */}
      <pointLight position={[0, 20, 0]} intensity={2.5} distance={90} color="#ffffff" />
    </>
  );
};
