"use client";
import axios from "axios";
import { useEffect } from "react";

export default function Logout() {
  const logout = async () => {
    await axios.get("/api/logout");
    location.href = "/";
  };

  useEffect(() => {
    logout();
  }, []);
}
