export default function ConnectButton({
  connected,
  onClick,
  disabled: externalDisabled = false,
}: {
  connected: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  const disabled = connected || externalDisabled;

  if (connected) {
    return (
      <button
        disabled
        className="w-full px-6 py-3 rounded bg-blue-600 text-white font-semibold opacity-50 cursor-not-allowed"
        id="connectBtn"
      >
        Connected!
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full btn-flip cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      data-front="CONNECT SENSOR"
      data-back="CONNECT SENSOR"
      style={{
        "--flip-front-bg": "#2563eb",
        "--flip-front-color": "#ffffff",
        "--flip-back-bg": "#ffffff",
        "--flip-back-color": "#2563eb",
      } as React.CSSProperties}
      id="connectBtn"
    />
  );
}
