import React, { PropsWithChildren, useRef } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

function Carousel({ children }: PropsWithChildren) {
  const slider = useRef(null) as any;
  const handleSlide = (direction: string) => {
    if (direction === "left") slider.current.scrollBy(-400, 0);
    else slider.current.scrollBy(400, 0);
  };
  return (
    <section>
      <div
        onClick={() => handleSlide("left")}
        className="left-3 top-10 text-base text-black absolute rounded-full flex justify-center items-center opacity-95 z-50 cursor-pointer"
      >
        <BsArrowLeftCircleFill />
      </div>
      <div
        onClick={() => handleSlide("right")}
        className="right-3 top-10 text-base text-black absolute rounded-full flex justify-center items-center opacity-95 z-50 cursor-pointer"
      >
        <BsArrowRightCircleFill />
      </div>
      <div
        ref={slider}
        className="flex overflow-x-scroll scrollbar-hide h-28 border-black/5 bg-white rounded-lg relative scroll-smooth"
      >
        {children}
      </div>
    </section>
  );
}

export default Carousel;
