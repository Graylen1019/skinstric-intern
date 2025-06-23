"use client";

import { Navbar } from "@/modules/navbar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [showMedium, setShowMedium] = useState(false);
  const [showBig, setShowBig] = useState(false);
  const [showSmall, setShowSmall] = useState(false);

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col min-h-[calc(100vh-56px)] overflow-x-hidden">
        <div className="absolute top-10 left-8 text-left mt-5">
          <h1 className="text-base font-semibold leading-[24px] tracking-tight">
            A.I. ANALYSIS
          </h1>
          <p className="text-sm mt-1 text-muted-foreground uppercase leading-[24px]">
            A.I. has estimated the following
            <br />
            Fix estimated information if needed
          </p>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center bg-white">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`absolute transition-all duration-400 w-[400px] h-[400px] ${
                  showSmall ? "opacity-100 scale-[1.5]" : "opacity-0 scale-[1]"
                }`}
              >
                <Image
                  id="small"
                  loading="lazy"
                  width={602}
                  height={602}
                  alt="small-square"
                  src={"/Rectangle%202779.png"}
                  className="filter brightness-0 absolute h-full w-full inset-0 object-contain"
                />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`absolute transition-all duration-400 w-[550px] h-[550px] ${
                  showMedium
                    ? "opacity-100 scale-[1.25]"
                    : "opacity-0 scale-[1]"
                }`}
              >
                <Image
                  id="medium"
                  alt="medium-square"
                  loading="lazy"
                  width={682}
                  height={682}
                  src={"/Rectangle%202780.png"}
                  className="filter brightness-0 absolute h-full w-full inset-0 object-contain"
                />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`absolute transition-all duration-400 w-[400px] h-[400px] ${
                  showBig ? "opacity-100 scale-[2]" : "opacity-0 scale-[1]"
                }`}
              >
                <Image
                  src={"/Rectangle%202778.png"}
                  alt="large-square"
                  width={762}
                  height={762}
                  loading="lazy"
                  id="large"
                  className=" absolute h-full w-full inset-0 object-contain"
                />
              </div>
            </div>
            <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0">
              <div className="flex items-center justify-center col-start-2">
                <Link href={"/summary"}>
                  <button
                    onMouseEnter={() => setShowSmall(true)}
                    onMouseLeave={() => setShowSmall(false)}
                    className="w-[153.88px] h-[153.88px] bg-gray-200 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-pointer font-semibold leading-[-24px] tracking-tight uppercase hover:scale-[1.05] transition-transform duration-300"
                  >
                    <span className="transform -rotate-45">Demographics</span>
                  </button>
                </Link>
              </div>
              <div className="flex items-center justify-center col-start-1 row-start-2">
                <button
                  onMouseEnter={() => setShowMedium(true)}
                  onMouseLeave={() => setShowMedium(false)}
                  className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-not-allowed font-semibold leading-[-24px] tracking-tight uppercase"
                >
                  <span className="transform -rotate-45">
                    Cosmetic concerns
                  </span>
                </button>
              </div>
              <div className="flex items-center justify-center col-start-3 row-start-2">
                <button
                  onMouseEnter={() => setShowMedium(true)}
                  onMouseLeave={() => setShowMedium(false)}
                  className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-not-allowed font-semibold leading-[-24px] tracking-tight uppercase"
                >
                  <span className="transform -rotate-45">
                    skin type details
                  </span>
                </button>
              </div>
              <div className="flex items-center justify-center col-start-2 row-start-3">
                <button
                  onMouseEnter={() => setShowBig(true)}
                  onMouseLeave={() => setShowBig(false)}
                  className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-not-allowed font-semibold leading-[-24px] tracking-tight uppercase"
                >
                  <span className="transform -rotate-45">Weather</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 md:pt-12 pb-8 bg-white sticky md:static bottom-40 mb-0 md:mb-0">
          <div className="flex justify-between items-center max-w-full mx-auto px-13 md:px-9"> {/* REVERTED HERE */}
            <Link href={"/"}>
              <div>
                <div className="relative w-12 h-12 flex items-center justify-center border border-solid rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold">
                    BACK
                  </span>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <div className="w-12 h-12 hidden sm:flex justify-center border border-solid rotate-45 scale-[0.85] group-hover:scale-[0.95] ease duration-300" />
                  <span className="absolute left-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.95] ease duration-300">
                    ◀
                  </span>
                  <span className="text-sm font-semibold hidden sm:block ml-6">
                    BACK
                  </span>
                </div>
              </div>
            </Link>

            <Link href={"/summary"}>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <span className="text-sm font-semibold hidden sm:block mr-5">
                  GET SUMMARY
                </span>
                <div className="w-12 h-12 hidden sm:flex relative items-center justify-center border border-solid rotate-45 scale-[0.85] group-hover:scale-[0.95] ease duration-300" />
                <span className="rotate-180 absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.95] ease duration-300">
                  ◀
                </span>
              </div>
              <div className="w-12 h-12 flex items-center justify-center border border-solid rotate-45 scale-[1] sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold">
                  SUM
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;