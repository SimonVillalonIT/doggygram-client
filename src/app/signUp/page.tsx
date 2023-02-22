"use client";
import React from "react";
import RegisterForm from "@/components/organisms/RegisterForm";

function Home() {
  return (
    <main className="flex w-screen justify-center">
      <div className="hidden flex-col items-center sm:flex sm:w-1/3">
        <h1 className="mt-24 mb-12 text-6xl font-vibes">Doggygram</h1>
      </div>
      <div className="flex flex-col justify-center items-center w-screen h-screen sm:w-1/3">
        <h1 className="mt-24 mb-12 text-6xl font-vibes sm:hidden">Doggygram</h1>
        <RegisterForm />
      </div>
    </main>
  );
}

export default Home;
