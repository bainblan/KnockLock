import Link from "next/link";

export default function KnockSetup() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 px-4">
      <h1 className="text-4xl font-bold tracking-tight">Choose Your Knock</h1>
      <div className="flex gap-6">
        <Link
          href="/"
          className="rounded-lg border-2 border-white bg-sky-400 px-8 py-4 text-lg font-bold text-white"
        >
          SET YOUR OWN KNOCK
        </Link>
        <Link
          href="/"
          className="rounded-lg border-2 border-white bg-sky-400 px-8 py-4 text-lg font-bold text-white"
        >
          RANDOMLY GENERATE KNOCK
        </Link>
      </div>
    </div>
  );
}
