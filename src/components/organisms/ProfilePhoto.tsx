import DogDetect from "@/utils/DogRecognition";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Avatar from "react-avatar-edit";
import useApi from "@/hooks/api";
import { useTokenStore } from "@/store/tokenStore";
import { DataURIToBlob } from "@/utils/DogRecognition";

function ProfilePhoto() {
  const api = useApi();
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
    setMessage("");
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
    try {
      console.log("clicked");
      const result = await DogDetect(preview);
      console.log(result);
      if (result === "notadog") {
        setMessage("The image does not contain a dog");
        return;
      }
      if (result === "dog") {
        const blob = DataURIToBlob(preview);
        const fileName = `${blob.name}.${blob.type.split("/")[1]}`;
        const file = new File([blob], fileName);
        const formData = new FormData();
        formData.append("image", file, fileName);

        const request = await api.post("/user/changeAvatar", formData);
        setMessage(
          "Your profile has been updated successfully, redirection to main page"
        );
        setLoggedIn(true);
        console.log(request);
        return request;
      }
    } catch (error) {
      console.log(error);
      console.log("error");
      setMessage("Internal Error, please try again");
    }
  };

  return (
    <div className="mt-20 w-2/5">
      <div className="border w-full p-8 flex flex-col items-center justify-center">
        <h3 className="text-gray-700">{Message}</h3>
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
            <button onClick={onCancel} className="border border-red border-2">
              Cancel
            </button>
            <button className="border-red border-2" onClick={onClick}>
              Use this avatar
            </button>
          </div>
        ) : null}
      </div>
      <div>Skip</div>
    </div>
  );
}

export default ProfilePhoto;
