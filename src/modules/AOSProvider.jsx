"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const AOSProvider = ({ children }) => {
  useEffect(() => {
    AOS.init({
      // Global settings
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return <>{children}</>;
};

export default AOSProvider;
