"use client";
import React, { useState } from "react";
import { useTokenStore } from "@/store/tokenStore";
import PrivateRoute from "@/utils/PrivateRoute";
import Story from "@/components/molecules/Story";
import Carousel from "@/components/organisms/Carousel";
import dynamic from "next/dynamic";

function Home() {
  const { logOut } = useTokenStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    logOut: state.logOut,
  }));
  const ReactStories = dynamic(() => import("react-insta-stories"), {
    ssr: false,
  });
  const images = ["/Doggygram.jpeg", "https://picsum.photos/200/300"];
  const [currentId, setCurrentId] = useState(0);
  return (
    <PrivateRoute>
      <Carousel>
        <Story name="John" />
        <Story name="Doe" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
        <Story name="Brian" />
      </Carousel>
      <ReactStories stories={images} />
    </PrivateRoute>
  );
}

export default Home;
