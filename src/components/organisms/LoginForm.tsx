import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import ButtonSubmit from "@/components/atoms/ButtonSubmit";
import InputText from "@/components/atoms/InputText";
import Link from "next/link";
import { useUserData } from "@/hooks/useUserData";
import { useTokenStore } from "@/store/tokenStore";

function LoginForm() {
  const { userData, handleOnChange } = useUserData();

  const { error, logIn, googleLogIn } = useTokenStore((state) => ({
    token: state.token,
    error: state.error,
    logIn: state.logIn,
    googleLogIn: state.googleLogIn,
  }));

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
    >
      <form
        onClick={() => {
          logIn(userData);
        }}
      >
        <p className="text-red">{error !== "" ? error : null}</p>
        <div className="flex flex-col items-center">
          <GoogleLogin
            onSuccess={(response) => {
              googleLogIn(response);
            }}
            onError={() => console.log("error")}
          />
          <div className="container">
            <hr className="hr-text" data-content="OR" />
          </div>
          <InputText
            name="user"
            value={userData.user}
            placeholder="Username or email"
            onChange={handleOnChange}
          />
          <InputText
            name="password"
            value={userData.password}
            placeholder="Password"
            onChange={handleOnChange}
          />
          <ButtonSubmit color="bg-light-blue" text="Log in" />
          <p className="mt-10 text-gray-400">
            {"Don't have an account? "}
            <Link href="/signUp" className="text-light-blue">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </GoogleOAuthProvider>
  );
}

export default LoginForm;
