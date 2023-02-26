"use client";
import React, { useEffect } from "react";
import { useTokenStore } from "@/store/tokenStore";
import { useRouter } from "next/navigation";
import LoginLayout from "@/components/layouts/LoginLayout";

export default function Home() {
  const router = useRouter();

  const { isLoggedIn } = useTokenStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  useEffect(() => {
    if (isLoggedIn) {
      return router.push("/home");
    }
  }, [isLoggedIn, router]);

  return <LoginLayout />;
}
