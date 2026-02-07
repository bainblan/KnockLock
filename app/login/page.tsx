"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push("/choose-knock");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 px-4">
      <h1 className="text-4xl font-bold tracking-tight">Welcome</h1>
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
        <input
          type="text"
          placeholder="Enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg border border-foreground/10 bg-foreground/5 px-4 py-3 text-foreground placeholder:text-foreground/40 outline-none focus:border-foreground/30"
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 rounded-lg border-2 border-white bg-sky-400 py-3 text-lg font-bold text-white"
          >
            LOG IN
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg border-2 border-white bg-sky-400 py-3 text-lg font-bold text-white"
          >
            CREATE ACCOUNT
          </button>
        </div>
      </form>
    </div>
  );
}
