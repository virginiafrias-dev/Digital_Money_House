"use client";
import HomePage from "@/components/home/HomePage";
import LandingPage from "@/components/home/LandingPage";
import { getToken } from "@/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkedToken, setCheckedToken] = useState(false);

  useEffect(() => {
    const readToken = async () => {
      const token = await getToken();
      setCheckedToken(true);
      setIsLoggedIn(!!token);
    };
    readToken();
  }, []);

  return (
    <>
      {checkedToken ? (
        isLoggedIn ? (
          <HomePage />
        ) : (
          <LandingPage />
        )
      ) : (
        <div
          data-test-id="spinner"
          className="bg-brand-black md:bg-brand-green flex grow min-h-full justify-center pt-[20%]"
        >
          <div className="h-10 w-10 bg-brand-green md:bg-brand-black rounded-full relative animate-spin transition transform flex justify-center items-center">
            <div className="bg-brand-black md:bg-brand-green h-8 w-8 rounded-full"></div>
            <div className="absolute right-0 top-0 h-5 w-5 bg-brand-black md:bg-brand-green"></div>
          </div>
        </div>
      )}
    </>
  );
}
