"use client";

import { LeftRectangle } from "@/modules/home/left-rectangle";
import { RightRectangle } from "@/modules/home/right-rectangle";
import { Navbar } from "@/modules/navbar";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  let headerTranslate = "";
  if (leftHovered) headerTranslate = "md:translate-x-[45px]";
  else if (rightHovered) headerTranslate = "md:-translate-x-[600px]";

  return (
    <>
      <Navbar />

      <div
        id="lower-left"
        className="hidden lg:block fixed bottom-[45px] left-[90px] lg:left-[75px] 2xl:left-[120px] [@media(width>=1920px)]:left-[450px] z-50 font-normal text-sm text-[#1A1B1C] space-y-3 uppercase"
      >
        <p>
          Skinstric developed an A.I. that creates a
          <br />
          highly-personalized routine tailored to
          <br />
          what your skin needs.
        </p>
      </div>

      <LeftRectangle faded={rightHovered} onHoverChange={setLeftHovered} />
      <RightRectangle faded={leftHovered} onHoverChange={setRightHovered} />

      <div className=" h-[90vh] w-full overflow-x-hidden max-sm:scale-[0.75] max-sm:origin-center max-sm:p-6">
        <div
          className={`flex flex-col items-center justify-center h-[71dvh] md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 transition-transform duration-800 ease-in-out relative ${headerTranslate}`}
        >
          <div className="z-0 absolute inset-0 flex items-center justify-center lg:hidden">
            <div
              id="big-square"
              className=" w-[420px] h-[420px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            ></div>
          </div>
          <div className="z-0 absolute inset-0 flex items-center justify-center lg:hidden">
            <div
              id="small-square"
              className="w-[350px] h-[350px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            ></div>
          </div>
          <div id="heading" className="relative z-10 text-center">
            <h1
              data-aos="fade-in"
              className="text-[55px] lg:text-[100px] leading-none tracking-tighter font-inter font-normal text-[#1A1B1C]"
            >
              Sophisticated
              <br />
              <span
                className="block w-full transition-transform duration-800 ease-in-out"
                style={{
                  transform: leftHovered
                    ? "translateX(18%)"
                    : rightHovered
                    ? "translateX(-18%)"
                    : "translateX(0%)",
                }}
              >
                skincare
              </span>
            </h1>
          </div>
          <p className="z-10 lg:hidden block w-[30ch] mt-4 text-[16px] font-semibold text-center text-muted-foreground text-[#1A1B1C83]">
            Skinstric developed an A.I. that creates a highly-personalized
            routine tailored to what your skin needs.
          </p>
          <div className="z-10 mt-4 lg:hidden">
            <Link
              href={"/testing"}
              className=" relative flex items-center gap-4 hover:scale-[1.05] duration-300"
            >
              <span className="text-xs font-bold cursor-pointer">
                ENTER EXPERIENCE
              </span>
              <div className="w-[24px] h-[24px] border border-solid border-black rotate-45 cursor-pointer" />
              <span className="absolute right-[3px] scale-[0.6] hover:scale-60  duration-300">
                ▶
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
