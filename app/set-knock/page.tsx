"use client";

import Knock from "../components/Knock";

export default function SetKnock() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between py-12 px-4">
      <Knock continueHref="/main" />
    </div>
  );
}
