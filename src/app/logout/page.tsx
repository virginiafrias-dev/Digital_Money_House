"use client";
import axios from "axios";
import { useEffect } from "react";

export default function LogoutPage() {
  const logout = async () => {
    await axios.get("/api/logout");
    location.href = "/home";
  };

  useEffect(() => {
    logout();
  }, []);

  return null;
}
