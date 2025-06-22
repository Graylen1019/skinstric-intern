"use client";

import { Navbar } from "@/modules/navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ApiResponse {
  message: string;
}

const Page = () => {
  const [error, setError] = useState<string | boolean>(false);
  const [cameraReady, setCameraReady] = useState(false); // True when live camera is showing
  const [capturedImageSrc, setCapturedImageSrc] = useState<string | null>(null); // Stores Base64 for preview
  const [isProcessingImage, setIsProcessingImage] = useState(false); // For API upload status

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      if (capturedImageSrc) {
        setCameraReady(false);
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.oncanplay = () => {
            setCameraReady(true);
            setError(false);
          };
        }
      } catch (err: unknown) {
        setCameraReady(false);
        let errorMessageText = "Camera access error: Unknown error.";
        if (err instanceof Error) {
          if (err.name === "NotAllowedError") {
            errorMessageText =
              "Camera access denied. Please allow camera access in your browser settings.";
          } else if (err.name === "NotFoundError") {
            errorMessageText =
              "No camera found. Please ensure a camera is connected.";
          } else if (err.name === "NotReadableError") {
            errorMessageText =
              "Camera is in use by another application. Please close other camera apps.";
          } else {
            errorMessageText = `Camera access error: ${err.message}`;
          }
        }
        setError(errorMessageText);

        setTimeout(() => {
          router.push("/result");
        }, 2000);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [router, capturedImageSrc]);

  const handleCapturePhoto = async () => {
    if (
      !videoRef.current ||
      !canvasRef.current ||
      !cameraReady ||
      isProcessingImage
    ) {
      console.warn("Camera not ready or currently processing.");
      return;
    }

    setError(false);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) {
      setError("Could not get canvas context.");
      return;
    }

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    // *** THE MISSING CRUCIAL STEP ***
    // Draw the current frame from the video onto the canvas.
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png"); // Or 'image/jpeg' if preferred

    // Extract just the Base64 part (remove "data:image/png;base64,")
    const base64Image = dataUrl.split(",")[1];

    if (!base64Image) {
      setError("Failed to convert image to Base64.");
      return;
    }

    setCapturedImageSrc(dataUrl); // Store full data URL for display
    setCameraReady(false); // Hide the live camera feed
  };

  const handleRetake = () => {
    setCapturedImageSrc(null); // Clear captured image
    setCameraReady(true); // Re-enable live camera
    setError(false);
  };

  const handleUsePhoto = async () => {
    if (!capturedImageSrc || isProcessingImage) {
      console.warn("No photo to use or already processing.");
      return;
    }
    // Extract base64 part for API upload, if capturedImageSrc still contains prefix
    const base64ForUpload = capturedImageSrc.split(",")[1];
    if (!base64ForUpload) {
      setError("Error preparing image for upload.");
      return;
    }
    await handleImageUpload(base64ForUpload);
  };

  const handleImageUpload = async (base64Image: string) => {
    setIsProcessingImage(true);
    setError(false);

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
      } catch (err) {
        console.error(
          "Failed to parse API response as JSON:",
          responseText,
          err
        );
        throw new Error(
          `HTTP error! Status: ${response.status}. Invalid API response.`
        );
      }

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

      try {
        localStorage.setItem("apiResponseData", JSON.stringify(responseData));
        console.log("Data saved to localStorage successfully!");
      } catch (localStorageError) {
        console.error("Error saving to localStorage:", localStorageError);
      }

      router.push("/select");
    } catch (err: unknown) {
      let uploadErrorText =
        "An unexpected error occurred during image processing.";
      if (err instanceof Error) {
        console.error("Upload Error:", err.message);
        uploadErrorText = err.message;
      } else {
        console.error("An unknown error occurred during image processing.");
      }
      setError(uploadErrorText);
    } finally {
      setIsProcessingImage(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-[90vh] w-screen">
        <div className="relative h-[92vh] w-screen overflow-hidden bg-gray-900">
          {error && (
            <div
              className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-30 px-4 py-3 rounded max-w-md text-center
              ${error && "bg-red-100 border border-red-400 text-red-700"}`}
            >
              <p>{error}</p>
            </div>
          )}

          {isProcessingImage && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center">
              <div className="bg-[#F6F6F682] backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-xl text-center text-[##1A1B1C41] text-xl font-normal">
                <p>ANALYZING IMAGE</p>
                <div className="flex justify-center space-x-2 mt-8 mb-4">
                  <div className="h-2 w-2 bg-[#A0A4AB] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-[#A0A4AB] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-[#A0A4AB] rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}

          {!capturedImageSrc && (
            <div className="absolute inset-0 z-10">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 flex items-center space-x-3">
                <div className="font-semibold text-sm tracking-tight leading-[14px] text-[#FCFCFC] hidden sm:block">
                  TAKE PICTURE
                </div>
                <div className="transform hover:scale-105 ease-in-out duration-300">
                  <Image
                    alt="Take Picture"
                    width={60}
                    height={60}
                    className={`w-16 h-16 cursor-pointer ${
                      isProcessingImage ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    src={"/Group40037.png"}
                    onClick={handleCapturePhoto} // Only capture here
                    priority
                  />
                </div>
              </div>
              <div className="absolute bottom-30 sm:bottom-40 left-0 right-0 text-center z-20">
                <p className="text-sm mb-2 font-normal leading-6 text-[#FCFCFC]">
                  TO GET BETTER RESULTS MAKE SURE TO HAVE
                </p>
                <div className="flex justify-center space-x-8 text-xs leading-6 text-[#FCFCFC]">
                  <p>◇ NEUTRAL EXPRESSION</p>
                  <p>◇ FRONTAL POSE</p>
                  <p>◇ ADEQUATE LIGHTING</p>
                </div>
              </div>
            </div>
          )}

          {capturedImageSrc && (
            <div className="absolute inset-0 z-10 flex flex-col items-center">
              <Image
                height={720}
                width={1280}
                src={capturedImageSrc}
                alt="Captured Preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute text-sm leading-6 uppercase text-[#FCFCFC] top-40">
                GREAT SHOT!
              </div>
              <div className="absolute bottom-40 sm:bottom-16 left-0 right-0 flex flex-col items-center z-20">
                <h2 className="text-lg font-semibold mb-5 md:mb-7 text-[#FCFCFC] drop-shadow-md">
                  Preview
                </h2>
                <div className="flex justify-center space-x-6">
                  <button
                    onClick={handleRetake}
                    className="px-4 py-1 bg-gray-200 text-grey-800 cursor-pointer hover:bg-gray-300 shadow-md text-sm"
                    disabled={isProcessingImage}
                  >
                    Retake
                  </button>
                  <button
                    onClick={handleUsePhoto}
                    className="px-6 py-2 bg-[#1A1B1C] text-[#FCFCFC] cursor-pointer hover:bg-gray-800 shadow-md text-sm"
                    disabled={isProcessingImage}
                  >
                    {isProcessingImage ? "Processing..." : "Use This Photo"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Back button, always present */}
          <div className="absolute md:bottom-8 bottom-60 left-8 z-20">
            <a href="/result">
              <div>
                <div className="relative w-12 h-12 flex items-center justify-center border border-[#FCFCFC] rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold sm:hidden text-[#FCFCFC]">
                    BACK
                  </span>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <div className=" w-12 h-12 hidden sm:flex justify-center border border-[#FCFCFC] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                  <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block text-[#FCFCFC] group-hover:scale-[0.92] ease duration-300">
                    ▶
                  </span>
                  <span className="text-sm font-semibold hidden sm:block ml-6 text-[#FCFCFC]">
                    BACK
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* Hidden Canvas for Image Capture */}
          <canvas ref={canvasRef} width={1280} height={720}></canvas>
        </div>
      </div>
    </>
  );
};

export default Page;
