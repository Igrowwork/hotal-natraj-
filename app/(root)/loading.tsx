import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      {/* <div className="loader">
                <p className="text-primary font-bold">
                    <span className="animate-loader letter1">L</span>
                    <span className="animate-loader letter2">o</span>
                    <span className="animate-loader letter3">a</span>
                    <span className="animate-loader letter4">d</span>
                    <span className="animate-loader letter5">i</span>
                    <span className="animate-loader letter6">n</span>
                    <span className="animate-loader letter7">g</span>
                    <span className="animate-loader letter8">.</span>
                    <span className="animate-loader letter9">.</span>
                    <span className="animate-loader letter10">.</span>
                </p>
            </div> */}
      <div className="relative h-20 w-full animate-pulse">
        <Image
          src={"/assets/images/natraj-logo.png"}
          alt="logo"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
