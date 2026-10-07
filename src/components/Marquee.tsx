export default function Marquee() {
  return (
    <div className="overflow-hidden bg-black py-4 border-b border-border/20">
      <div className="flex min-w-max animate-[marquee_40s_linear_infinite] gap-12 text-blush">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex gap-12 items-center text-[11px] font-semibold uppercase tracking-[0.2em] font-display">
            <span>NEW AW26 DROP LIVE</span>
            <span className="text-white/50">✦</span>
            <span>CRAFTED IN TOKYO & MILAN</span>
            <span className="text-white/50">✦</span>
            <span>500GSM HEAVYWEIGHT FLEECE</span>
            <span className="text-white/50">✦</span>
            <span>MEMBERS-ONLY RELEASES</span>
            <span className="text-white/50">✦</span>
            <span>FREE SHIPPING OVER $200</span>
            <span className="text-white/50">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}