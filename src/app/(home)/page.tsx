"use client";

import { LeftRectangle } from "@/modules/home/left-rectangle";
import { RightRectangle } from "@/modules/home/right-rectangle";
import { Navbar } from "@/modules/navbar";
import { useState } from "react";

const Page = () => {
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  let headerTranslate = "";
  if (leftHovered) headerTranslate = "translate-x-[384px]";
  else if (rightHovered) headerTranslate = "-translate-x-[384px]";

  return (
    <>
      <Navbar />

      <LeftRectangle faded={rightHovered} onHoverChange={setLeftHovered} />
      <RightRectangle faded={leftHovered} onHoverChange={setRightHovered} />
      <div
        className={`flex flex-col items-center justify-center h-[80vh] transition-transform duration-800 ease-in-out overflow-hidden ${headerTranslate}`}
      >
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
      </div>
      <div className="fixed bottom-[70px] left-[70px] font-normal text-sm text-[#1A1B1C] space-y-3 uppercase">
        <p>
          Skinstric developed an A.I. that creates a
          <br />
          highly-personalized routine tailored to
          <br />
          what your skin needs.
        </p>
      </div>
    </>
  );
};

export default Page;
