import React from "react";
import Image from "next/image";

function Story({ name }: any) {
  return (
    <div className="ml-5 text-center">
      <div className=" w-16 h-16 aspect-square rounded-full flex items-center justify-center mb-2">
        <Image
          className=" w-14 h-14 rounded-full m-1 border-2 border-white"
          width={50}
          height={50}
          src="https://i.pravatar.cc/300"
          alt="Avatar"
        />
      </div>
      <p className=" text-xs text-[#262626] whitespace-nowrap overflow-hidden text-ellipsis w-16">
        Name
      </p>
    </div>
  );
}

export default Story;
