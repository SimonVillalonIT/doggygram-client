import React from "react";
import ButtonSubmit from "@/components/atoms/ButtonSubmit";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import InputText from "@/components/atoms/InputText";
import { Formik, Form, ErrorMessage } from "formik";
import useFormik from "@/hooks/useFormik";

function LoginForm() {
  const { loginValidateFields, handleLoginSubmit } = useFormik();

  return (
    <Formik
      initialValues={{
        user: "",
        password: "",
      }}
      validate={loginValidateFields}
      onSubmit={handleLoginSubmit}
    >
      {({ errors }) => (
        <Form className="flex flex-col items-center w-full">
          <ErrorMessage className="text-red" name="user" component="small" />
          <InputText
            error={errors.user ? true : false}
            name="user"
            placeholder="Username or email"
          >
            <AiOutlineUser className="relative" />
          </InputText>
          <ErrorMessage
            className="text-red"
            name="password"
            component="small"
          />
          <InputText
            error={errors.password ? true : false}
            name="password"
            placeholder="Password"
            password={true}
          >
            <RiLockPasswordLine />
          </InputText>
          <ButtonSubmit
            disabled={errors.user !== "" && errors.password ? true : false}
            color="bg-light-blue"
            text="Log in"
          />
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
