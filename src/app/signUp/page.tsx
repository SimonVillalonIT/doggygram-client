"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/store/tokenStore";
import RegisterLayout from "@/components/layouts/RegisterLayout";

function Home() {
  const router = useRouter();

  const { isLoggedIn } = useTokenStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  useEffect(() => {
    if (isLoggedIn) {
      return router.push("/home") as any;
    }
  }, [isLoggedIn, router]);

  return <RegisterLayout />;
}

export default Home;
