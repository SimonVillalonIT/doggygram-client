import { GenerateFormData } from "@/utils/DogRecognition";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Avatar from "react-avatar-edit";
import Button from "../atoms/Button";
import { useTokenStore } from "@/store/tokenStore";
import axios from "axios";
import SkipButton from "../atoms/SkipButton";

function ProfilePhoto() {
  const { setLoggedIn, token } = useTokenStore((state) => ({
    setLoggedIn: state.setLoggedIn,
    token: state.token,
  }));
  const [src, setSrc] = useState("");
  const [preview, setPreview] = useState("");
  const [Message, setMessage] = useState(
    "Select your profile photo (only dogs allowed)"
  );

  const avatarPickerRef = useRef(null) as any;

  const onClose = () => {
    avatarPickerRef.current.classList.add("hidden");
    setMessage("Click Confirm to finish or Cancel to try another photo");
  };

  const onCrop = (view: string) => {
    setPreview(view);
    setMessage("When you finish press the 'X' ");
  };

  const onCancel = () => {
    setPreview("");
    avatarPickerRef.current.classList.remove("hidden");
    setMessage("Select your profile photo (only dogs allowed)");
  };

  const onClick = async () => {
    const formData = GenerateFormData(preview);
    try {
      await axios.post(
        "http://localhost:8080/api/user/changeAvatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
      setMessage(
        "Your profile has been updated successfully, redirection to main page"
      );
      setLoggedIn(true);
    } catch (e: any) {
      console.log(e.response.data.error);
      if (typeof e.response.data.error === "string")
        setMessage(e.response.data.error);
    }
  };

  return (
    <div className="mt-20 sm:w-2/5">
      <div className="border w-full p-8 flex flex-col items-center justify-center">
        <h3 className="text-gray-600 mb-8">{Message}</h3>
        <div ref={avatarPickerRef}>
          <Avatar
            borderStyle={{
              width: "2px",
              height: "2px",
              border: "1px solid black",
              borderRadius: "999px",
              backgroundImage: "url('/Doggygram.jpeg')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              display: "flex",
              justifyContent: "center",
              opacity: 0.5,
            }}
            cropRadius={100}
            width={200}
            height={200}
            onCrop={onCrop}
            onClose={onClose}
            src={src}
          />
        </div>
        <Image
          className={`rounded-full object-contain ${
            preview === "" ? "hidden" : null
          }`}
          src={preview}
          alt="Avatar"
          width={150}
          height={150}
        />
        {preview !== "" ? (
          <div className="w-full flex justify-between mt-8">
            <Button onClick={onCancel} text="Cancel" />
            <Button
              text="Confirm"
              onClick={async () => {
                onClick();
              }}
            />
          </div>
        ) : null}
      </div>
      <SkipButton />
    </div>
  );
}

export default ProfilePhoto;
