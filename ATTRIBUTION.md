# Asset Licensing and Attribution Audit

This document certifies and attributes all 3D models, textures, audio, and visual assets used in the **UTKARSH CITY** 3D Interactive Portfolio.

---

## 1. 3D Models

### Sports Car Model
- **File:** `public/models/sports_car.glb` (1.68 MB)
- **Source:** Three.js Official Examples repository (`examples/models/gltf/ferrari.glb`)
- **Original Author:** Mike Faber
- **License:** CC0 1.0 Universal / MIT (Three.js asset library license)
- **Modifications:** PBR materials, custom sunset amber & metallic gold paint shader, custom glass transmission, rotating wheel rigs, forward xenon projectors, taillight diffuser, and animated super-gear afterburner exhaust flames.

### Character Model
- **File:** `public/models/character.glb` (1.84 MB)
- **Source:** Three.js Official Examples Repository (`examples/models/gltf/readyplayer.me.glb`, PR #29428 by `sunag`)
- **Original Creator / Platform:** Ready Player Me
- **Three.js Distribution License:** MIT License (Copyright © 2010-2026 three.js authors)
- **Ready Player Me Studio Terms Analysis:**
  - *Personal Developer Portfolio Use:* **Permitted** under Ready Player Me standard free terms for individual developers and non-commercial showcases (< $100,000 annual business revenue).
  - *Direct Commercial Resale / SaaS Asset Redistribution:* **Restricted** without an enterprise Ready Player Me Partner Studio Agreement.
  - *Open Source Compliance:* Because the binary is sourced directly from Three.js's official MIT example library, it inherits the Three.js MIT distribution grant for web demonstrations.
  - *Recommended Unrestricted Commercially Permitted Replacements:*
    1. **Khronos Group CesiumMan** (`glTF-Sample-Models/2.0/CesiumMan/glTF-Binary/CesiumMan.glb`): 100% permitted for unrestricted commercial exploitation under Apache 2.0 / CC-BY 4.0.
    2. **Three.js Vanguard Soldier** (`examples/models/gltf/Soldier.glb`): 100% royalty-free under MIT License.
- **Modifications Applied:** Tailored formal charcoal-grey suit (`#1e293b`), crisp white collared shirt, black formal spectacles, polished oxford shoes, natural posture alignment beside the luxury vehicle, and holographic pedestal integration with Utkarsh Arora's authentic portrait.

---

## 2. Textures & Photography

### Reference Portrait
- **File:** `public/utkarsh_arora.jpeg` (74.1 KB)
- **Subject:** Utkarsh Arora
- **License / Rights:** Exclusively owned and authorized by Utkarsh Arora for use in this personal portfolio.

---

## 3. Audio System

### Procedural Synthesizer
- **Implementation:** `src/utils/audio.ts`
- **Engine:** Browser Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`, `BiquadFilterNode`)
- **License:** Custom procedural code (MIT)
- **Status:** 100% royalty-free, zero external audio MP3/WAV files required, 0 KB network payload, completely self-contained.

---

## 4. Fonts

- **Plus Jakarta Sans:** Open Font License (OFL), Google Fonts
- **JetBrains Mono:** SIL Open Font License 1.1, Google Fonts

---

## 5. Software Libraries

- **React:** MIT License
- **Three.js & @react-three/fiber & @react-three/drei:** MIT License
- **GSAP (GreenSock):** Standard Web License (Free for non-commercial web applications)
- **Tailwind CSS & Lucide React:** MIT License

