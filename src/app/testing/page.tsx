"use client";

import { useState } from "react";
import { Navbar } from "@/modules/navbar";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface ApiResponse {
  successMessage?: string
  message?: string;
  name?: string;
  location?: string;
}

const Page = () => {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const [currentStage, setCurrentStage] = useState<
    "nameInput" | "locationInput" | "submitting" | "completed"
  >("nameInput");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_ENDPOINT =
    "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    if (currentStage === "nameInput") {
      let validationError = "";
      if (!name.trim()) {
        validationError = "Please enter your name";
      } else if (/\d/.test(name)) {
        validationError =
          "Please enter a valid name without numbers or special characters";
      }

      if (validationError) {
        setError(validationError);
        setLoading(false);
        return;
      }

      setCurrentStage("locationInput");
      setLoading(false);
      return;
    }

    if (currentStage === "locationInput") {
      let validationError = "";
      if (!location.trim()) {
        validationError = "Please enter your city";
      } else if (/\d/.test(location)) {
        validationError =
          "Please enter a valid city without numbers or special characters";
      }

      if (validationError) {
        setError(validationError);
        setLoading(false);
        return;
      }

      setCurrentStage("submitting");

      try {
        const response = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            location: location.trim(),
          }),
        });

        const responseData: ApiResponse = await response
          .json()
          .catch(() => ({}));

        if (!response.ok) {
          const errorMessage =
            responseData.message ||
            response.statusText ||
            "Unknown error from API";
          throw new Error(
            `HTTP error! Status: ${response.status}. ${errorMessage}`
          );
        }
        
        console.log("FULL API Response:" , responseData);
        console.log("Success:", responseData.message)

        setCurrentStage("completed");
        setLoading(false);

        return;
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Failed to send data: ${err.message}`);
        } else {
          setError("An unexpected error occurred during submission.");
        }
        setCurrentStage("locationInput");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center">
        <div className="absolute top-16 left-9 text-left">
          <p className="font-normal text-xs">TO START ANALYSIS</p>
        </div>

        <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
          <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">
            {(currentStage === "locationInput" ||
              currentStage === "nameInput") &&
              "Click to type"}
            {currentStage === "submitting" && "Processing Submission"}
          </p>

          <div className="flex flex-col items-center gap-4 z-10">
            <p className="text-2xl font-normal text-[#1A1B1C] tracking-wide">
              {currentStage === "completed" && "Thank you!"}
            </p>
            <p className="text-lg text-gray-600">
              {currentStage === "completed" && "Procced for the next step"}
            </p>
          </div>

          {loading && (
            <div className="flex space-x-2 justify-center items-center bg-white mt-6 ">
              <div className="h-2 w-2 bg-[#A0A4AB] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 bg-[#A0A4AB] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 bg-[#A0A4AB] rounded-full animate-bounce"></div>
            </div>
          )}

          <form className="relative z-50" onSubmit={handleSubmit}>
            {error && (
              <div className="flex flex-col items-center">
                <p className="text-red-500 text-sm mb-2">{error}</p>
              </div>
            )}

            {currentStage === "nameInput" && (
              <div>
                <input
                  autoFocus
                  className="text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[432px] pt-1 tracking-[-0.07em] leading-[64px] z-20 text-black"
                  type="text"
                  placeholder="Introduce Yourself"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}

            {currentStage === "locationInput" && (
              <div>
                <input
                  autoFocus
                  className="text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[432px] pt-1 tracking-[-0.07em] leading-[48px] z-20 text-black"
                  type="text"
                  placeholder="your city name"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
          </form>

          <img
            id="small"
            loading="lazy"
            width="602"
            height="602"
            alt="small-square"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-spin-slowest"
            src={"/Rectangle%202778.png"}
          />
          <img
            id="medium"
            alt="medium-square"
            loading="lazy"
            width="682"
            height="682"
            src={"/Rectangle%202779.png"}
            className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[682px] md:h-[682px] rotate-185 animate-spin-slower z-10"
          />
          <img
            src={"/Rectangle%202780.png"}
            alt="large-square"
            width="762"
            height="762"
            loading="lazy"
            id="large"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] md:w-[762px] md:h-[762px] rotate-190 z-10 animate-spin-slow"
          />
        </div>

        <div className="absolute bottom-9 w-full flex justify-between px-13">
          <Link href={"/"} className="inset-0">
            <div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <div className="w-12 h-12 flex justify-center border border-solid rotate-45 scale-[0.85] group-hover:scale-[1] duration-300 ease-in-out"></div>
                <div className="absolute left-[15px] bottom-[13px] scale-[1] duration-300 group-hover:scale-[1.15] ease">
                  ◀
                </div>
                <span className="text-sm font-semibold hidden sm:block ml-6">
                  BACK
                </span>
              </div>
            </div>
          </Link>

          <AnimatePresence>
            {currentStage === "completed" && (
              <Link href={"/results"} className="inset-0" key="proceed-link">
                <motion.div
                  initial={{ opacity: 0, x: -160 }} // Start 40px to the left
                  animate={{ opacity: 1, x: 0 }} // Move to center
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="group hidden sm:flex flex-row relative justify-center items-center"
                >
                  <span className="text-sm font-semibold hidden sm:block mr-6">
                    PROCEED
                  </span>
                  <div className="w-12 h-12 flex justify-center border border-solid rotate-45 scale-[0.85] group-hover:scale-[1] duration-300 ease-in-out"></div>
                  <div className="absolute right-[15px] bottom-[13px] scale-[1] duration-300 group-hover:scale-[1.15] ease">
                    ▶
                  </div>
                </motion.div>
              </Link>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Page;
