import React from "react";
import LoginForm from "@/components/organisms/LoginForm";
import FormContainer from "@/components/organisms/FormContainer";
import Preview from "../organisms/Preview";

function LoginLayout() {
  return (
    <main className="flex w-4/5 justify-evenly">
      <Preview />
      <FormContainer type="Login">
        <LoginForm />
      </FormContainer>
    </main>
  );
}

export default LoginLayout;
