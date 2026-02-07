"use client";

import { useEffect, useRef, useState } from "react";

type UseAudio = {
  playClick: () => void;
  playSequence: (intervals: number[]) => void;
  resumeAudio: () => Promise<void>;
  ready: boolean;
};

export default function useAudio(): UseAudio {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
      timeoutsRef.current = [];
      if (ctxRef.current) {
        try {
          ctxRef.current.close();
        } catch (_) {}
      }
    };
  }, []);

  const ensureContext = async () => {
    if (!ctxRef.current) {
      const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const gain = ctx.createGain();
      gain.gain.value = 0.9;
      gain.connect(ctx.destination);
      ctxRef.current = ctx;
      masterGainRef.current = gain;
      setReady(true);
    }
  };

  const resumeAudio = async () => {
    await ensureContext();
    if (ctxRef.current && ctxRef.current.state === "suspended") {
      try {
        await ctxRef.current.resume();
      } catch (_) {}
    }
  };

  const playClick = () => {
    if (!ctxRef.current) {
      void ensureContext();
    }
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    const now = ctx.currentTime;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.02), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-20 * (i / data.length));
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filt = ctx.createBiquadFilter();
    filt.type = "highpass";
    filt.frequency.value = 700;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    src.connect(filt);
    filt.connect(gain);
    gain.connect(master);
    src.start(now);
    src.stop(now + 0.06);
  };

  const playSequence = (intervals: number[]) => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];

    // First knock immediately
    playClick();
    let t = 0;
    for (let i = 0; i < intervals.length; i++) {
      t += intervals[i];
      const id = window.setTimeout(() => {
        playClick();
      }, t);
      timeoutsRef.current.push(id);
    }
  };

  return { playClick, playSequence, resumeAudio, ready };
}
