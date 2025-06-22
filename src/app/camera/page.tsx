"use client";

import { Navbar } from "@/modules/navbar";
import Image from "next/image";
import { useRef, useEffect, useState } from "react"; // Import hooks

const App = () => {
  const videoRef = useRef(null); // Reference to the video element
  const canvasRef = useRef(null); // Reference to the canvas element
  const [stream, setStream] = useState(null); // To store the MediaStream object
  const [facingMode, setFacingMode] = useState("user"); // 'user' for front camera, 'environment' for rear camera

  // Function to start the camera stream
  const startCamera = async () => {
    try {
      // Stop existing tracks if any to avoid conflicts when switching cameras
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode, // 'user' (front camera) or 'environment' (rear camera)
        },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access your camera. Please check permissions.");
    }
  };

  // Start camera on component mount
  useEffect(() => {
    startCamera();

    // Clean up: stop camera tracks when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]); // Restart camera if facingMode changes

  // Function to take a picture
  const takePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current frame of the video onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the image data as a Data URL (e.g., base64 PNG)
      const imageDataURL = canvas.toDataURL("image/png");

      // Now you can do something with imageDataURL:
      console.log("Captured Image Data URL:", imageDataURL);

      // Example:
      // 1. Display the image on the page (e.g., in an <img> tag)
      // 2. Send it to a server for processing
      // 3. Store it in local storage
      // 4. Navigate to a results page with the image data (e.g., via a global state management or query parameter)

      // For demonstration, let's say you want to navigate to /result with the image.
      // This is a simplified example; for large images, consider more robust methods.
      // Example with localStorage:
      localStorage.setItem("capturedImage", imageDataURL);
      // Then navigate:
      // window.location.href = "/result"; // Or use Next.js useRouter
    }
  };

  // Function to toggle between front and rear cameras (if available)
  const toggleCamera = () => {
    setFacingMode((prevMode) =>
      prevMode === "user" ? "environment" : "user"
    );
  };

  return (
    <>
      <Navbar />
      <div className="h-[90vh] w-screen">
        <div className="relative h-[92vh] w-screen overflow-hidden bg-gray-900">
          <div className="absolute inset-0 z-10">
            <video
              ref={videoRef} // Assign ref to video element
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            ></video>
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 flex items-center space-x-3">
              <div className="font-semibold text-sm tracking-tight leading-[14px] text-[#FCFCFC] hidden sm:block">
                TAKE PICTURE
              </div>
              <div className="transform hover:scale-105 ease-in-out duration-300">
                <Image
                  src={"/Group40037.png"}
                  alt="Take Picture"
                  width={60}
                  height={60}
                  className="w-16 h-16 cursor-pointer"
                  onClick={takePicture} // Attach click handler
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
          <canvas ref={canvasRef} className="hidden"></canvas>{" "}
          {/* Assign ref to canvas element */}
        </div>
      </div>
    </>
  );
};

export default App;