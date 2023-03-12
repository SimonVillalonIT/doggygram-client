"use client";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/store/tokenStore";
import { PropsWithChildren, useEffect } from "react";

function PrivateRoute(props: PropsWithChildren) {
  const router = useRouter();
  const { isLoggedIn, logOut } = useTokenStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    logOut: state.logOut,
  }));
  useEffect(() => {
    if (!isLoggedIn) router.push("/") as any;
  }, []);

  return props.children as any;
}

export default PrivateRoute;
