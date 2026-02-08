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
      className={`w-full px-6 py-3 rounded bg-gray-500 text-white font-semibold transition-opacity ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
      }`}
    >
      LOGOUT
    </button>
  );
}
