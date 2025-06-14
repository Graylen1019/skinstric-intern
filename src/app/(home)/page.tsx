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
  if (leftHovered) headerTranslate = "translate-x-[360px]";
  else if (rightHovered) headerTranslate = "-translate-x-[360px]";

  return (
    <>
      <Navbar />

      <LeftRectangle faded={rightHovered} onHoverChange={setLeftHovered} />
      <RightRectangle faded={leftHovered} onHoverChange={setRightHovered} />

      <div className="max-sm:scale-[0.75] max-sm:origin-center max-sm:p-6">
        <div
          className={`flex flex-col items-center justify-center h-[71dvh] transition-transform duration-800 ease-in-out overflow-hidden ${headerTranslate}`}
        >
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="w-[420px] h-[420px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="w-[350px] h-[350px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div id="heading" className="relative z-50 text-center">
            <h1
              data-aos="fade-in"
              className="text-[60px] lg:text-[100px] leading-none tracking-tight font-inter font-normal text-[#1A1B1C]"
            >
              Sophisticated
              <br />
              <span
                className="block w-fulltransition-transform duration-800 ease-in-out"
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
          <div className="fixed lg:bottom-[70px] lg:left-[50px] md:bottom-[50px] md:left-[50px]  font-normal text-sm text-[#1A1B1C] space-y-3 uppercase hidden lg:block">
            <p>
              Skinstric developed an A.I. that creates a
              <br />
              highly-personalized routine tailored to
              <br />
              what your skin needs.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
