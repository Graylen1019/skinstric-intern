import { Navbar } from "@/modules/navbar";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen md:h-[90vh] flex flex-col md:mt-5">
        <div className="flex-1 w-full bg-white md:overflow-hidden overflow-auto">
          <div className="md:h-full max-w-full mx-5 px-4 md:px-auto flex flex-col">
            <div className="text-start ml-4 mb-4 md:mb-10 md:ml-0">
              <h1 className="text-base font-semibold mb-1 leading-[24px]">
                A.I. ANALYSIS
              </h1>
              <h1 className="text-4xl md:text-7xl font-normal leading-[64px] tracking-tighter">
                DEMOGRAPHICS
              </h1>
              <h1 className="text-sm mt-2 leading-[24px]">
                PREDICTED RACE & AGE
              </h1>
            </div>

            <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
              <div className="space-y-2 md:flex md:flex-col h-[62%]">
                <div className="p-2 bg-[#1A1B1C] hover:bg-black text-white flex-1 flex flex-col justify-between space-y-4 border-t">
                  {/* TODO: ADD dynamic Race */}
                  <p className="font-semibold">BLACK</p>
                  <h1 className="font-semibold">RACE</h1>
                </div>
                <div className="p-2 bg-[#F3F3F4] hover:bg-  text-black flex-1 flex flex-col justify-between space-y-4 border-t">
                  {/* TODO: ADD dynamic AGE */}
                  <p className="font-semibold">50-59</p>
                  <h1 className="font-semibold">AGE</h1>
                </div>
                <div className="p-2 bg-[#F3F3F4] hover:bg- text-black flex-1 flex flex-col justify-between space-y-4 border-t">
                  {/* TODO: ADD dynamic SEX */}
                  <p className="font-semibold">MALE</p>
                  <h1 className="font-semibold">SEX</h1>
                </div>
              </div>
              <div className="relative bg-[#F3F3F4] p-3 flex flex-col items-center justify-center md:h-[57vh] border-t">
                    {/* TODO: set this data dynamically depending on which column is selected */}
                <p className="hidden md:block md:absolute text-5xl mb-2 left-5 top-2">
                    {/* TODO: dynamic race, age, or sex. */}
                  White
                </p>
                <div className="relative md:absolute w-full max-w-[384px] mb-4 md:right-5 md:bottom-2">
                  <div className="w-full h-full max-h-[384px] relative transform scale-[1] origin-center">
                    {/* TODO: Functionality of the progress bar. */}
                    <svg
                      className="CircularProgressbar text-[#1A1B1C]"
                      viewBox="0 0 100 100"
                    >
                        {/* This is the tail or percentage */}
                      <path
                        className="CircularProgressbar-trail"
                        d="M 50,50 m 0,-49.15 a 49.15,49.15 0 1 1 0,98.3 a 49.15,49.15 0 1 1 0,-98.3"
                        strokeWidth={1.7}
                        fillOpacity={0}
                        stroke="#C1C2C3" // <-- Add this line
                        style={{
                          strokeLinecap: "butt",
                          strokeDasharray: "308.819px, 308.819px",
                          strokeDashoffset: "0px",
                        }}
                      />
                      {/* This is the background */}
                      <path
                        className="CircularProgressbar-path"
                        d="
                            M 50,50
                            m 0,-49.15
                            a 49.15,49.15 0 1 1 0,98.3
                            a 49.15,49.15 0 1 1 0,-98.3
                            "
                        stroke="#1A1B1C"
                        strokeWidth={1.7}
                        fillOpacity={0}
                        style={{
                          stroke: "rgb(26, 27, 28)",
                          strokeLinecap: "butt",
                          transitionDuration: "0.8s",
                          strokeDasharray: "308.819px, 308.819px",
                          strokeDashoffset: "308.819px",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-3xl md:text-4xl font-normal">
                        {/* TODO: set this data dynamically */}
                        0
                        <span className="absolute text-xl md:text-3xl">%</span>
                      </p>
                    </div>
                  </div>
                </div>
                <p className="md:absolute text-xs text-[#A0A4AB] md:text-sm lg:text-base font-normal mb-1 leading-[24px] md:bottom-[-15%] md:left-[22%] lg:left-[30%] xl:left-[40%] 2xl:left-[45%]">
                  If A.I. estimate is wrong, select the correct one.
                </p>
              </div>
              <div className="bg-[#F3F3F4] pt-4 pb-4 border-t">
                <div className="space-y-0">
                  <div className="flex justify-between px-4">
                    <h1 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                    {/* TODO: set this data dynamically depending on which column is selected */}
                      RACE
                    </h1>
                    <h1 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                      A.I. CONFIDENCE
                    </h1>
                  </div>
                  <div className="flex items-center justify-between h-[48px] hover:bg-[#E1E1E2] px-4 cursor-pointer">
                    <div className="flex items-center gap-1">
                      <Image
                        src={"/radio-button.png"}
                        width={12}
                        height={12}
                        alt="Radio button"
                        className="w-[12px] h-[12px] mr-2"
                      />
                      <span className="font-normal text-base leading-6 tracking-tight">
                        Black
                      </span>
                    </div>
                    <span className="font-normal text-base leading-6 tracking-tight">
                      62%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between h-[48px] hover:bg-[#E1E1E2] px-4 cursor-pointer">
                  <div className="flex items-center gap-1">
                    <Image
                      src={"/radio-button.png"}
                      width={12}
                      height={12}
                      alt="Radio button"
                      className="w-[12px] h-[12px] mr-2"
                    />
                    <span className="font-normal text-base leading-6 tracking-tight">
                      Black
                    </span>
                  </div>
                  <span className="font-normal text-base leading-6 tracking-tight">
                    62%
                  </span>
                </div>
                <div className="flex items-center justify-between h-[48px] hover:bg-[#E1E1E2] px-4 cursor-pointer">
                  <div className="flex items-center gap-1">
                    <Image
                      src={"/radio-button.png"}
                      width={12}
                      height={12}
                      alt="Radio button"
                      className="w-[12px] h-[12px] mr-2"
                    />
                    <span className="font-normal text-base leading-6 tracking-tight">
                      Black
                    </span>
                  </div>
                  <span className="font-normal text-base leading-6 tracking-tight">
                    62%
                  </span>
                </div>
                <div className="flex items-center justify-between h-[48px] hover:bg-[#E1E1E2] px-4 cursor-pointer">
                  <div className="flex items-center gap-1">
                    <Image
                      src={"/radio-button.png"}
                      width={12}
                      height={12}
                      alt="Radio button"
                      className="w-[12px] h-[12px] mr-2"
                    />
                    <span className="font-normal text-base leading-6 tracking-tight">
                      Black
                    </span>
                  </div>
                  <span className="font-normal text-base leading-6 tracking-tight">
                    62%
                  </span>
                </div>
                <div className="flex items-center justify-between h-[48px] hover:bg-[#E1E1E2] px-4 cursor-pointer">
                  <div className="flex items-center gap-1">
                    <Image
                      src={"/radio-button.png"}
                      width={12}
                      height={12}
                      alt="Radio button"
                      className="w-[12px] h-[12px] mr-2"
                    />
                    <span className="font-normal text-base leading-6 tracking-tight">
                      Black
                    </span>
                  </div>
                  <span className="font-normal text-base leading-6 tracking-tight">
                    62%
                  </span>
                </div>
                <div className="flex items-center justify-between h-[48px] hover:bg-[#E1E1E2] px-4 cursor-pointer">
                  <div className="flex items-center gap-1">
                    <Image
                      src={"/radio-button.png"}
                      width={12}
                      height={12}
                      alt="Radio button"
                      className="w-[12px] h-[12px] mr-2"
                    />
                    <span className="font-normal text-base leading-6 tracking-tight">
                      Black
                    </span>
                  </div>
                  <span className="font-normal text-base leading-6 tracking-tight">
                    62%
                  </span>
                </div>
                <div className="flex items-center justify-between h-[48px] hover:bg-[#E1E1E2] px-4 cursor-pointer">
                  <div className="flex items-center gap-1">
                    <Image
                      src={"/radio-button.png"}
                      width={12}
                      height={12}
                      alt="Radio button"
                      className="w-[12px] h-[12px] mr-2"
                    />
                    <span className="font-normal text-base leading-6 tracking-tight">
                      Black
                    </span>
                  </div>
                  <span className="font-normal text-base leading-6 tracking-tight">
                    62%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white pt-4 md:pt-[37px] pb-6 sticky bottom-40 md:static md:bottom-0 mb-8 md:mb-16">
              <div className="flex justify-between max-w-full mx-auto px-4 md:px-0">
                <Link href={"/"}>
                  <div>
                    <div className="relative w-12 h-12 flex items-center justify-center border border-solid rotate-45 scale-[1] sm:hidden">
                      <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
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
                      HOME
                    </span>
                    <div className="w-12 h-12 hidden sm:flex relative items-center justify-center border border-solid rotate-45 scale-[0.85] group-hover:scale-[0.95] ease duration-300" />
                    <span className="rotate-180 absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.95] ease duration-300">
                      ◀
                    </span>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center border border-solid rotate-45 scale-[1] sm:hidden">
                    <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                      HOME
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
