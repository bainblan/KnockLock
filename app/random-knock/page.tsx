"use client";

import Link from "next/link";
import { useState } from "react";
import useAudio from "../../lib/useAudio";

export default function RandomKnock() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastIntervals, setLastIntervals] = useState<number[] | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [soundType, setSoundType] = useState<"knock" | "click" | "bell" | "wood">("knock");
  const { playSequence, resumeAudio } = useAudio();

  const generateAndPlay = async () => {
    setError(null);
    setLoading(true);
    try {
      // Ensure audio context started by a user gesture
      await resumeAudio();

      const res = await fetch("/api/rhythm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "random" }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      // Expecting { description, intervals }
      const intervals: number[] = Array.isArray(data?.intervals) ? data.intervals : [];
      const desc = typeof data?.description === "string" ? data.description : null;

      setLastIntervals(intervals.length ? intervals : null);
      setDescription(desc);

      if (intervals && intervals.length > 0) {
        playSequence(intervals, soundType);
      } else {
        setError("No rhythm returned");
      }
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 px-4">
      <h1 className="text-4xl font-bold tracking-tight">MEMORIZE THE KNOCK PATTERN</h1>
      <Link
        href="/"
        className="rounded-lg bg-sky-400 px-8 py-3 text-lg font-bold text-white"
      >
        GENERATE
      </Link>
    </div>
  );
}
