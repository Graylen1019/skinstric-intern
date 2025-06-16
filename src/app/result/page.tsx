"use client";

import { Navbar } from "@/modules/navbar";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface ApiResponse {
  message: string;
  filename?: string;
  data?: unknown;
}

const Page = () => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageUpload = async (base64Image: string) => {
    setIsProcessingImage(true);

    const API_ENDPOINT =
      "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const responseText = await response.text();
      let responseData: ApiResponse = { message: "Unknown response format" };

      try {
        responseData = JSON.parse(responseText);
      } catch {}

      if (!response.ok) {
        const errorMessage =
          responseData.message ||
          response.statusText ||
          "Unknown error from API";
        throw new Error(
          `HTTP error! Status: ${response.status}. ${errorMessage}`
        );
      }

      console.log("FULL API Response:", responseData);
      console.log(
        "Success:",
        responseData.message || "Image uploaded successfully."
      );

      alert("Image analyzed successfully!");
      router.push("/select");
    } catch (err: unknown) {
      if (err instanceof Error) {
      } else {
        console.log("An unexpected error occurred during image processing.");
      }
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageUrl(reader.result as string);
        const base64String = (reader.result as string).split(",")[1];
        if (base64String) {
          handleImageUpload(base64String);
        } else {
          console.log("Failed to convert image to Base64.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center">
        <div className="absolute top-2 left-9 md:left-8 text-left">
          <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
        </div>
        <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
          <div
            className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center"
            id="left"
          >
            <div className="w-[270px] h-[270px] md:h-[482px] md:w-[482px]" />
            <Image
              src="/Rectangle%202780.png"
              alt="large-square"
              width={484}
              height={484}
              loading="lazy"
              id="large"
              className="absolute h-[270px] w-[270px] md:w-[482px] md:h-[482px] rotate-200 animate-spin-slow filter brightness-0"
            />
            <Image
              id="medium"
              alt="medium-square"
              loading="lazy"
              width={444.34}
              height={444.34}
              src="/Rectangle%202779.png"
              className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] rotate-190 animate-spin-slower filter brightness-0"
            />
            <Image
              id="small"
              width={405.18}
              height={405.18}
              alt="small-square"
              className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest filter brightness-0"
              src="/Rectangle%202778.png"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Image
                src="/camera-icon.png"
                width={136}
                height={136}
                alt="camera-icon"
                className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-110 duration-500 ease-in-out cursor-pointer"
              />
              <div className="absolute bottom-[1%] right-[90%] md:top-[30.9%] md:right-[-12px] translate-y-[-20px]">
                <p className="text-xs md:text-sm font-normal mt-1 leading-[24px]">
                  ALLOW A.I.
                  <br />
                  TO SCAN YOUR FACE
                </p>
                <Image
                  src={"/Group%2039690.png"}
                  alt="line"
                  width={66}
                  height={59}
                  className="rotate-180 absolute hidden md:block md:right-[143px] md:top-[20px]"
                />
              </div>
            </div>
          </div>

          <div
            className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-0 -translate-y-[10%] transition-opacity duration-300 opacity-100"
            id="right"
          >
            <div className="h-[270px] w-[270px] md:h-[482px] md:w-[482px]" />
            <Image
              src="/Rectangle%202780.png"
              alt="large-square"
              width={484}
              height={484}
              loading="lazy"
              id="large"
              className="absolute h-[270px] w-[270px] md:w-[482px] md:h-[482px] rotate-205 animate-spin-slow filter brightness-0"
            />
            <Image
              id="medium"
              alt="medium-square"
              loading="lazy"
              width={448}
              height={448}
              src="/Rectangle%202779.png"
              className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] rotate-195 animate-spin-slower filter brightness-0"
            />
            <Image
              id="small"
              loading="lazy"
              width={408}
              height={408}
              alt="small-square"
              className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest filter brightness-0"
              src="/Rectangle%202778.png"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Image
                src="/gallery-icon.png"
                width={136}
                height={136}
                alt="gallery-icon"
                className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-110 duration-500 ease-in-out cursor-pointer"
                onClick={handleGalleryIconClick}
              />

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10%]">
                <p className="text-xs md:text-sm font-normal mt-2 leading-[24px] text-right">
                  ALLOW A.I.
                  <br />
                  ACCESS GALLERY
                </p>
                <Image
                  src={"/Group%2039690.png"}
                  alt="line"
                  width={66.33}
                  height={59.37}
                  className="absolute hidden md:block md:left-[120px] md:bottom-[39px]"
                />
              </div>
            </div>
          </div>

          {isProcessingImage && (
            <>
              <div
                className="w-full relative md:absolute md:left-1/2 md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-1/2 flex items-center justify-center "
                id="upload"
              >
                <div className="w-full h-[484px] bg-white" />
                <div className="flex flex-col items-center justify-center w-full relative md:absolute md:left-1/2 md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-1/2 gap-y-8 ">
                  <p className="font-semibold">PREPARING YOUR ANALYSIS...</p>
                  <div className="flex space-x-4">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
                <Image
                  src="/Rectangle%202780.png"
                  alt="large-square"
                  width={484}
                  height={484}
                  loading="lazy"
                  id="large"
                  className="absolute h-[270px] w-[270px] md:w-[482px] md:h-[482px] rotate-205 animate-spin-load filter brightness-0"
                />
                <Image
                  id="medium"
                  alt="medium-square"
                  loading="lazy"
                  width={448}
                  height={448}
                  src="/Rectangle%202779.png"
                  className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] rotate-195 animate-spin-load-slow filter brightness-0"
                />
                <Image
                  id="small"
                  loading="lazy"
                  width={408}
                  height={408}
                  alt="small-square"
                  className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-load-slower filter brightness-0"
                  src="/Rectangle%202778.png"
                />
              </div>
            </>
          )}

          <div className="absolute top-[-75px] right-7 md:top-[-50px] md-right-8 transition-opacity duration-300 opacity-100">
            <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
            <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden flex items-center justify-center">
              {previewImageUrl ? (
                <Image
                  src={previewImageUrl}
                  alt="Selected Image Preview"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="pt-4 md:pt-0 pb-8 bg-white absolute md:static bottom-30.5 mb-0">
          <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
            <Link href={"/"} className="inset-0">
              <div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <div className="w-12 h-12 flex justify-center border border-solid rotate-45 scale-[0.85] group-hover:scale-[1] duration-300 ease-in-out" />
                  <div className="absolute left-[15px] bottom-[13px] scale-[1] duration-300 group-hover:scale-[1.15] ease">
                    ◀
                  </div>
                  <span className="text-sm font-semibold hidden sm:block ml-6">
                    BACK
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
