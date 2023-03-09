import React from "react";

function SkipButton() {
  return (
    <div>
      <div className="flex justify-end">
        <div className="mt-10 space-y-20">
          <div className="w-full">
            <div className="flex-1 h-full w-96 mx-auto">
              <div className="flex w-full bg-white shadow rounded-lg py-4 px-16">
                <p className="m-auto inset-0 text-xl font-semibold leading-7 text-center text-gray-800">
                  Skip
                </p>
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkipButton;
