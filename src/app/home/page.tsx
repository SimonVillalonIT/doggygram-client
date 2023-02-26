"use client";
import React from "react";
import { useTokenStore } from "@/store/tokenStore";
import PrivateRoute from "@/utils/PrivateRoute";

function Home() {
  const { logOut } = useTokenStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    logOut: state.logOut,
  }));
  return (
    <PrivateRoute>
      <div>
        <header className="w-screen bg-black">
          <p
            onClick={() => {
              logOut();
            }}
            className="text-white"
          >
            Log Out
          </p>
        </header>
        <div>Hello world</div>
      </div>
    </PrivateRoute>
  );
}

export default Home;
