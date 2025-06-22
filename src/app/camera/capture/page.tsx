"use client";
import { Navbar } from "@/modules/navbar";
import { useEffect, useRef, useState } from "react";

const Page = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let active = true;
    const startCamera = async () => {
      try {
        if (
          typeof window === "undefined" ||
          !navigator.mediaDevices ||
          !navigator.mediaDevices.getUserMedia
        ) {
          setCameraError("Camera access is not supported in this browser.");
          return;
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (active) {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        } else {
          // If effect is already cleaning up, stop tracks immediately
          mediaStream.getTracks().forEach((track) => track.stop());
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setCameraError("Unable to access the camera. Please check your permissions and try again.");
      }
    };

    startCamera();

    return () => {
      active = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
    // Only run on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Attach stream to video element when both are ready
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6">Live Camera Feed</h1>
        {cameraError ? (
          <div className="text-red-600 text-lg">{cameraError}</div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-w-2xl border-2 border-blue-500 rounded-lg shadow-lg"
            style={{ transform: "scaleX(-1)" }}
          ></video>
        )}
        <p className="mt-4 text-sm text-gray-600">
          Your browser may display a permission indicator (e.g., a camera icon
          in the address bar) showing that your camera is in use.
        </p>
      </div>
    </>
  );
};

export default Page;