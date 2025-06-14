import Image from "next/image";

export const SpinningSquares = () => {
  return (
    <>
      <Image
        id="small"
        loading="lazy"
        width={602}
        height={602}
        alt="small-square"
        className="z-10 animate-spin-slowest"
        src="/Rectangle%202778.png"
      />
      <Image
        id="medium"
        alt="medium-square"
        loading="lazy"
        width={682}
        height={682}
        src="/Rectangle%202779.png"
        className="w-[400px] h-[400px] md:w-[682px] md:h-[682px] rotate-185 animate-spin-slower z-10"
      />
      <Image
        src="/Rectangle%202780.png"
        alt="large-square"
        width={762}
        height={762}
        loading="lazy"
        id="large"
        className="w-[480px] h-[480px] md:w-[762px] md:h-[762px] rotate-190 z-10 animate-spin-slow"
      />
    </>
  );
};
