"use client";
import HomePage from "@/components/home/HomePage";
import LandingPage from "@/components/home/LandingPage";
import { getToken } from "@/utils";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

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

  useEffect(() => {}, [isLoggedIn]);

  // const handleGetAccountInfo = async () => {
  //   const token = getToken();

  //   try {
  //     const accountResponse = await axios.get(
  //       "https://digitalmoney.digitalhouse.com/api/account",
  //       {
  //         headers: {
  //           Authorization: `${token}`,
  //         },
  //       }
  //     );
  //     const userResponse = await axios.get(
  //       "https://digitalmoney.digitalhouse.com/api/users/" +
  //         accountResponse.data.user_id,
  //       {
  //         headers: {
  //           Authorization: `${token}`,
  //         },
  //       }
  //     );
  //     console.log(userResponse.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      {checkedToken ? (
        isLoggedIn ? (
          <HomePage />
        ) : (
          <LandingPage />
        )
      ) : (
        <div className="bg-brand-black flex grow min-h-full justify-center pt-[20%]">
          <div className="h-10 w-10 bg-brand-green rounded-full relative animate-spin transition transform flex justify-center items-center">
            <div className="bg-brand-black h-8 w-8 rounded-full"></div>
            <div className="absolute right-0 top-0 h-5 w-5 bg-brand-black"></div>
          </div>
        </div>
      )}
      {/* <button onClick={handleGetAccountInfo}>Get Account Info</button> */}
    </>
  );
}
