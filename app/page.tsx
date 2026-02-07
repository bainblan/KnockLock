"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Knock from "./components/Knock";
import Intro from "./components/Intro";


export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <>
      {!introDone && <Intro onComplete={handleIntroComplete} />}
      <div className="flex h-screen flex-col items-center justify-between py-12 px-4">
        <h1 className="text-5xl font-bold tracking-tight">WHO&apos;S THERE?</h1>
        <Image
          src="/Door Closed.png"
          alt="Closed door"
          width={250}
          height={450}
          priority
        />
        <div className="w-full max-w-lg rounded-lg border border-foreground/10 bg-foreground/5 p-6">
          <p className="text-center text-foreground/60">Use your knock to unlock door.</p>
        </div>
        <Knock />
        <Link
          href="/knock-setup"
          className="rounded-lg bg-sky-400 px-8 py-3 text-lg font-bold text-white"
        >
          OTHER PAGE
        </Link>
        <input
          type="text"
          placeholder="Ask a question..."
          className="w-full max-w-lg rounded-lg border border-foreground/10 bg-foreground/5 px-4 py-3 text-foreground placeholder:text-foreground/40 outline-none focus:border-foreground/30"
        />
      </div>
    </>
  );
}
