import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ForgotPassword } from "../components/forgot-password";

export default function Page() {
  return (
    <main className="h-screen w-full flex justify-center items-center">
      <div className="h-full w-full lg:w-1/2 flex flex-col gap-10 justify-center items-center">
        <div className="flex flex-col gap-2 -ml-8">
          <h2 className="text-3xl font-medium">{`Welcome back!`}</h2>
          <p>{`Enter your Email for Rest Password`}</p>
        </div>
        <div className="px-[10%] w-full sm:w-2/3">
          <ForgotPassword />
        </div>
      </div>
      <div className="flex lg:w-1/2">
        <div className="relative h-screen w-full">
          <Image
            src={"/assets/images/signup-img.jpg"}
            alt=""
            fill
            className="object-cover rounded-tl-3xl rounded-bl-3xl"
          />
        </div>
      </div>
    </main>
  );
}
