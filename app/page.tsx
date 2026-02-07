"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Intro from "./components/Intro";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const router = useRouter();

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
    router.push("/login");
  }, [router]);

  return (
    <>
      {!introDone && <Intro onComplete={handleIntroComplete} />}
      <div className="h-screen" />
    </>
  );
}
