"use client";
import React, { useEffect } from "react";
import { useTokenStore } from "@/store/tokenStore";
import LoginForm from "@/components/organisms/LoginForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { isLoggedIn } = useTokenStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  useEffect(() => {
    if (isLoggedIn) {
      return router.push("/home");
    }
  }, [isLoggedIn]);

  return (
    <main className="flex w-screen justify-center">
      <div className="hidden flex-col items-center sm:flex sm:w-1/3">
        <h1 className="mt-24 mb-12 text-6xl font-vibes">Doggygram</h1>
      </div>
      <div className="flex flex-col justify-center items-center w-screen h-screen sm:w-1/3">
        <h1 className="mt-24 mb-12 text-6xl font-vibes sm:hidden">Doggygram</h1>
        <LoginForm />
      </div>
    </main>
  );
}
