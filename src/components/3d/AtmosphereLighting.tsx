import React from 'react';

export const AtmosphereLighting: React.FC = () => {
  return (
    <>
      {/* Sky & Fog for Dubai Golden Hour Atmosphere */}
      <color attach="background" args={["#0c0b16"]} />
      <fog attach="fog" args={["#121024", 25, 160]} />

      {/* Main Golden-Hour Sun */}
      <directionalLight
        position={[45, 55, 35]}
        intensity={2.4}
        color="#ffb066"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={250}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
        shadow-bias={-0.0005}
      />

      {/* Twilight Sky Ambient Fill Light */}
      <ambientLight intensity={0.65} color="#2b264a" />

      {/* Opposite Horizon Fill Light (Cool Dusk Teal/Blue) */}
      <directionalLight
        position={[-50, 30, -50]}
        intensity={0.8}
        color="#22d3ee"
      />

      {/* Royal Purple Rim Light from Ground Level */}
      <directionalLight
        position={[0, -20, 0]}
        intensity={0.3}
        color="#8b5cf6"
      />

      {/* Subtle Central Plaza Accent Light */}
      <pointLight position={[0, 15, 0]} intensity={1.5} distance={70} color="#f59e0b" />
    </>
  );
};
