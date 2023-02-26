"use client";
import React, { useState } from "react";
import FormContainer from "@/components/organisms/FormContainer";
import RegisterForm from "@/components/organisms/RegisterForm";
import ProfilePhoto from "../organisms/ProfilePhoto";
import Preview from "../organisms/Preview";

function RegisterLayout() {
  const [isPicking, setIsPicking] = useState(false);

  return (
    <main className="flex w-4/5 justify-evenly">
      <Preview />
      {!isPicking ? (
        <FormContainer type="Register">
          <RegisterForm set={setIsPicking} />
        </FormContainer>
      ) : (
        <ProfilePhoto />
      )}
    </main>
  );
}

export default RegisterLayout;
