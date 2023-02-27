"use client";
import React from "react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import InputText from "../atoms/InputText";
import ButtonSubmit from "../atoms/ButtonSubmit";
import useFormik from "@/hooks/useFormik";
import { Formik, Form, ErrorMessage } from "formik";

function RegisterForm(props: any) {
  const { registerValidateFields, handleRegisterSubmit } = useFormik();

  return (
    <Formik
      initialValues={{
        user: "",
        email: "",
        password: "",
        "re-password": "",
      }}
      validate={registerValidateFields}
      onSubmit={async (values, setFieldError) => {
        const result = await handleRegisterSubmit(values, setFieldError);
        result.token ? props.set(true) : null;
      }}
    >
      {({ errors }) => (
        <Form className="flex flex-col items-center">
          <ErrorMessage className="text-red" name="user" component="small" />
          <InputText
            error={errors.user ? true : false}
            name="user"
            placeholder="Username"
          >
            <AiOutlineUser />
          </InputText>
          <ErrorMessage className="text-red" name="email" component="small" />
          <InputText
            error={errors.email ? true : false}
            name="email"
            placeholder="Email"
          >
            <AiOutlineMail />
          </InputText>
          <ErrorMessage
            className="text-red w-64 text-center"
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
          <ErrorMessage
            className="text-red"
            name="re-password"
            component="small"
          />
          <InputText
            error={errors.password ? true : false}
            name="re-password"
            placeholder="Re-enter Password"
            password={true}
          >
            <RiLockPasswordLine />
          </InputText>
          <ButtonSubmit
            disabled={
              errors.user !== "" && errors.email !== "" && errors.password
                ? true
                : false
            }
            color="bg-light-blue"
            text="Register"
          />
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
