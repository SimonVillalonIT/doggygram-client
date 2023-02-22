"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/store/tokenStore";

function Home() {
  const { isLoggedIn } = useTokenStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      return router.push("/");
    }
  }, [isLoggedIn]);

  return <div>Hello world</div>;
}

export default Home;
