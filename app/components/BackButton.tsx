"use client";

import { useRouter } from "next/navigation";

export default function BackButton({
  disabled = false,
  onClick: onClickProp,
}: {
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
}) {
  const router = useRouter();

  const handleClick = async () => {
    if (disabled) return;
    if (onClickProp) {
      await onClickProp();
    } else {
      router.back();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`w-full btn-flip cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      data-front="LOGOUT"
      data-back="LOGOUT"
      style={{
        "--flip-front-bg": "#6b7280",
        "--flip-front-color": "#ffffff",
        "--flip-back-bg": "#ffffff",
        "--flip-back-color": "#6b7280",
      } as React.CSSProperties}
    />
  );
}
