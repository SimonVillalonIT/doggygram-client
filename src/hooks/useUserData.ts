"use client";
import { useState } from "react";

export type userData = {
  user: string;
  email?: string;
  password: string;
  "re-password"?: string;
};

export const useUserData = () => {
  const [userData, setUserData] = useState<userData>({
    user: "",
    password: "",
    email: "",
  });

  const handleOnChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return { userData, setUserData, handleOnChange };
};
