import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex flex-row h-[64px] w-full items-center justify-between py-3 mb-3 relative z-[50]">
      <div className="scale-75 flex flex-row items-center justify-center pt-1">
        <Link
          href={"/"}
          className="flex items-center justify-center gap-2 h-9 px-4 py-2 font-semibold text-sm mr-2 leading-[16px] "
        >
          SKINSTRIC
        </Link>
        <div className="flex items-center justify-center">
          <Image
            width={4}
            height={17}
            src="/left-bracket.png"
            alt="left bracket"
          />
          <p className="text-[#1A1B1C83] font-bold text-sm ml-1 mr-1">INTRO</p>
          <Image
            width={4}
            height={17}
            src="/right-bracket.png"
            alt="right bracket"
          />
        </div>
      </div>
      <button className=" font-roobert scale-75 flex items-center justify-center gap-2 font-semibold pointer-events-none h-9 px-4 py-2 mx-4 text-white text-[10px] bg-black ">
        ENTER CODE
      </button>
    </div>
  );
};
