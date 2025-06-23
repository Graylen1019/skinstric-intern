"use client";

import { Navbar } from "@/modules/navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/camera/capture");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="md:h-[85vh] h-[65vh] bg-white flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-[70vh] overflow-auto">
          <div className="flex-0 flex flex-col md:flex-row items-center justify-center relative">
            <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
            <Image
              src={"/Rectangle%202780.png"}
              alt="Diamond Large"
              width={482}
              height={482}
              className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow"
            />
            <Image
              src={"/Rectangle%202779.png"}
              alt="DiamondMedium"
              width={444.34}
              height={444.34}
              className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower"
            />
            <Image
              src={"/Rectangle%202778.png"}
              alt="DiamondSmall"
              width={405.18}
              height={405.18}
              className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center animate-pulse">
              <Image
                src={"/camera-icon.png"}
                alt="Camera Icon"
                width={136}
                height={136}
                className="w-[100px] h-[100px] md:w-[136px] md:h-[136px] animate-pulse-grow"
              />
              <p className="absolute font-semibold text-sm md:text-base leading-[24px] tracking-tight translate-y-22 animate-pulse">
                SETTING UP CAMERA ...
              </p>
            </div>
          </div>
          <div className="mt-0 text-center">
            <p className="text-xs md:text-sm mb-4 leading-6">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>
            <div className="flex justify-center space-x-8">
              <p className="text-xs md:text-sm leading-6">
                ◇ NEUTRAL EXPRESSION
              </p>
              <p className="text-xs md:text-sm leading-6">◇ FRONTAL POSE</p>
              <p className="text-xs md:text-sm leading-6">
                ◇ ADEQUATE LIGHTING
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
