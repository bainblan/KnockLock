import Image from "next/image";

export default function Door({ knocking, open, onClose }: { knocking: boolean; open?: boolean; onClose?: () => void }) {
  return (
    <div className="relative h-[360px] w-[300px]" onClick={open ? onClose : undefined} style={open ? { cursor: "pointer" } : undefined}>
      <Image
        src={open ? "/Door Open.png" : "/Door Closed.png"}
        alt={open ? "Door open" : "Door closed"}
        width={200}
        height={360}
        className="absolute left-1/2 top-0 h-full w-auto -translate-x-1/2 object-contain"
        priority
      />
      {!open && (
        <Image
          src={knocking ? "/knock 45 deg.svg" : "/knock hand.svg"}
          alt={knocking ? "Knocking hand" : "Hand ready to knock"}
          width={100}
          height={100}
          className={`absolute top-1/3 transition-all duration-100 ${knocking ? "right-[40px]" : "right-0"}`}
        />
      )}
    </div>
  );
}
