import { useEffect, useRef, useState, useCallback } from 'react';

export function useAudio() {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const engineGainRef = useRef<GainNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const engineOscRef = useRef<OscillatorNode | null>(null);
  const engineOsc2Ref = useRef<OscillatorNode | null>(null);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Ambient City Drone
      const ambientOsc = ctx.createOscillator();
      ambientOsc.type = 'sine';
      ambientOsc.frequency.setValueAtTime(55, ctx.currentTime); // Low A

      const ambientFilter = ctx.createBiquadFilter();
      ambientFilter.type = 'lowpass';
      ambientFilter.frequency.setValueAtTime(220, ctx.currentTime);

      const ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(isMuted ? 0 : 0.08, ctx.currentTime);
      ambientGainRef.current = ambientGain;

      ambientOsc.connect(ambientFilter);
      ambientFilter.connect(ambientGain);
      ambientGain.connect(ctx.destination);
      ambientOsc.start();

      // Sports Car Engine Synth (Dual Sawtooth + Sub)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(65, ctx.currentTime); // Idle ~65Hz

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(32.5, ctx.currentTime); // Sub-bass rumble

      const engineFilter = ctx.createBiquadFilter();
      engineFilter.type = 'lowpass';
      engineFilter.frequency.setValueAtTime(350, ctx.currentTime);

      const engineGain = ctx.createGain();
      engineGain.gain.setValueAtTime(isMuted ? 0 : 0.04, ctx.currentTime);
      engineGainRef.current = engineGain;

      osc1.connect(engineFilter);
      osc2.connect(engineFilter);
      engineFilter.connect(engineGain);
      engineGain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      engineOscRef.current = osc1;
      engineOsc2Ref.current = osc2;
    } catch {
      // AudioContext not allowed before user gesture
    }
  }, [isMuted]);

  const toggleSound = useCallback(() => {
    initAudio();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    setIsMuted(prev => {
      const next = !prev;
      const now = audioCtxRef.current?.currentTime || 0;
      if (ambientGainRef.current && audioCtxRef.current) {
        ambientGainRef.current.gain.setTargetAtTime(next ? 0 : 0.08, now, 0.2);
      }
      if (engineGainRef.current && audioCtxRef.current) {
        engineGainRef.current.gain.setTargetAtTime(next ? 0 : 0.04, now, 0.2);
      }
      return next;
    });
  }, [initAudio]);

  const playIgnition = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    // Starter motor clicks
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(140 + i * 20, now + i * 0.12);
      gain.gain.setValueAtTime(0.06, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.09);
    }

    // Engine roar surge
    const roar = ctx.createOscillator();
    const roarGain = ctx.createGain();
    roar.type = 'sawtooth';
    roar.frequency.setValueAtTime(50, now + 0.4);
    roar.frequency.exponentialRampToValueAtTime(220, now + 0.9);
    roar.frequency.exponentialRampToValueAtTime(75, now + 1.6);

    roarGain.gain.setValueAtTime(0.01, now + 0.4);
    roarGain.gain.exponentialRampToValueAtTime(0.18, now + 0.8);
    roarGain.gain.exponentialRampToValueAtTime(0.04, now + 1.8);

    roar.connect(roarGain);
    roarGain.connect(ctx.destination);
    roar.start(now + 0.4);
    roar.stop(now + 1.9);
  }, [isMuted]);

  const playChime = useCallback((pitch = 440) => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, now + 0.15);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.36);
  }, [isMuted]);

  const updateEngineSpeed = useCallback((speedFactor: number) => {
    if (!audioCtxRef.current || !engineOscRef.current || !engineOsc2Ref.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    const baseFreq = 65 + Math.min(speedFactor, 1.5) * 120;
    engineOscRef.current.frequency.setTargetAtTime(baseFreq, now, 0.1);
    engineOsc2Ref.current.frequency.setTargetAtTime(baseFreq * 0.5, now, 0.1);
  }, []);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return {
    isMuted,
    toggleSound,
    playIgnition,
    playChime,
    updateEngineSpeed,
    initAudio
  };
}

