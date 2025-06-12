"use client";

import Link from "next/link";

interface RightRectangleProps {
  onHoverChange: (hovered: boolean) => void;
  faded?: boolean;
}

export const RightRectangle = ({
  faded,
  onHoverChange,
}: RightRectangleProps) => {
  return (
    <div
      id="right"
      className={`fixed right-[-308px] w-[500px] h-[500px] top-1/2 -translate-y-1/2 z-10 transition-opacity duration-500 ease-in-out ${
        faded ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative w-full h-full">
        <div className="w-full h-full border border-dotted border-[#A0A4AB] inset-0 rotate-45"></div>
        <Link
          href="/testing"
          className="group cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-4 rounded-full text-sm font-normal text-black h-9 absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/5 px-3 py-1 z-20"
          onMouseEnter={() => onHoverChange(true)}
          onMouseLeave={() => onHoverChange(false)}
        >
          <span>TAKE TEST</span>
          <div className="w-[30px] h-[30px] border border-solid rotate-45 pointer-events-none transition-transform duration-300 group-hover:scale-[1.05]"></div>
          <div className="absolute right-[17px] top-[8.5px] scale-[0.9] transition-transform duration-300 group-hover:scale-[1.05]">
            ▶
          </div>
        </Link>
      </div>
    </div>
  );
};
