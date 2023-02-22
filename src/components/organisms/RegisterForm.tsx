"use client";
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useTokenStore } from "@/store/tokenStore";
import { useUserData } from "@/hooks/useUserData";
import InputText from "../atoms/InputText";
import ButtonSubmit from "../atoms/ButtonSubmit";
import Link from "next/link";
import NoSSRWrapper from "./NoSSRWrapper";

function RegisterForm() {
  const { error, register, googleLogIn } = useTokenStore((state) => ({
    register: state.register,
    googleLogIn: state.googleLogIn,
    error: state.error,
  }));

  const { userData, handleOnChange } = useUserData();

  return (
    <NoSSRWrapper>
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
      >
        <form
          onClick={() => {
            register(userData);
          }}
        >
          <p className="text-red">{error !== "" ? error : null}</p>
          <div className="flex flex-col items-center">
            <GoogleLogin
              onSuccess={(response) => googleLogIn(response)}
              onError={() => console.log("error")}
            />
            <div className="container">
              <hr className="hr-text" data-content="OR" />
            </div>
            <InputText
              name="user"
              value={userData.user}
              placeholder="Username"
              onChange={handleOnChange}
            />
            <InputText
              name="email"
              value={userData.email}
              placeholder="Email"
              onChange={handleOnChange}
            />
            <InputText
              name="password"
              value={userData.password}
              placeholder="Password"
              onChange={handleOnChange}
            />
            <InputText
              name="re-password"
              value={userData.password}
              placeholder="Re-enter password"
              onChange={handleOnChange}
            />
            <ButtonSubmit color="bg-light-blue" text="Log in" />
            <p className="mt-10 text-gray-400">
              {"Already have an account? "}
              <Link href="/" className="text-light-blue">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </GoogleOAuthProvider>
    </NoSSRWrapper>
  );
}

export default RegisterForm;
