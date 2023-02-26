import React, { PropsWithChildren } from "react";
import { useTokenStore } from "@/store/tokenStore";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Hr from "../atoms/Hr";

function GoogleAuth() {
  const { googleLogIn } = useTokenStore((state) => ({
    googleLogIn: state.googleLogIn,
  }));

  return (
    <div className="p-8 w-full">
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
      >
        <div className="flex flex-col items-center">
          <GoogleLogin
            onSuccess={(response) => {
              googleLogIn(response);
            }}
            onError={() => console.log("error")}
          />
        </div>
      </GoogleOAuthProvider>
      <Hr />
    </div>
  );
}

export default GoogleAuth;
