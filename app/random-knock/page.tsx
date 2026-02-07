import Link from "next/link";

export default function RandomKnock() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 px-4">
      <h1 className="text-4xl font-bold tracking-tight">COMING SOON</h1>
      <Link
        href="/"
        className="rounded-lg bg-sky-400 px-8 py-3 text-lg font-bold text-white"
      >
        BACK
      </Link>
    </div>
  );
}
