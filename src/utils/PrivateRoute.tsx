import React from "react";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/store/tokenStore";
import { PropsWithChildren } from "react";

function PrivateRoute(props: PropsWithChildren) {
  const router = useRouter();
  const { isLoggedIn, logOut } = useTokenStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    logOut: state.logOut,
  }));

  return isLoggedIn ? props.children : (router.push("/") as any);
}

export default PrivateRoute;
