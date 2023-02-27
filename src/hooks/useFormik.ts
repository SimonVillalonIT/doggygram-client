import { useTokenStore } from "@/store/tokenStore";

const useFormik = () => {
  const { register, logIn } = useTokenStore((state) => ({
    logIn: state.logIn,
    register: state.register,
  }));

  const registerValidateFields = (values: {
    user?: string;
    email?: string;
    password?: string;
    "re-password"?: string;
  }) => {
    const errors: {
      user?: string;
      email?: string;
      password?: string;
      repassword?: string;
    } = {};

    if (!values.user) {
      errors.user = "Required username";
    }
    if (!values.email) {
      errors.email = "Required email address";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required password";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(values.password)
    ) {
      errors.password =
        "Your password must be eight characters long and contain at least one capital letter and one number.";
    } else if (values.password !== values["re-password"]) {
      errors.password = "Password does not match";
    }
    return errors;
  };

  const loginValidateFields = (values: {
    user?: string;
    password?: string;
  }) => {
    const errors: { user?: string; password?: string } = {};

    if (!values.user) {
      errors.user = "required username";
    } else if (["admin", "null", "god"].includes(values.user)) {
      errors.user = "Nice try";
    }
    if (!values.password) {
      errors.user = "required password";
    }
    return errors;
  };

  const handleRegisterSubmit = async (
    values: {
      user: string;
      email: string;
      password: string;
    },
    { setFieldError }: any
  ) => {
    try {
      const result = await register(values);
      return result;
    } catch (error: any) {
      if (error.response.data.error.message.includes("Duplicate entry")) {
        return setFieldError("user", "User already exists");
      }
      return setFieldError("user", "Server error");
    }
  };

  const handleLoginSubmit = async (
    values: { user: string; password: string },
    { setFieldError }: any
  ) => {
    try {
      const result = await logIn(values);
      return result;
    } catch (error: any) {
      return setFieldError("user", "Username or password incorrect");
    }
  };

  return {
    registerValidateFields,
    handleRegisterSubmit,
    handleLoginSubmit,
    loginValidateFields,
  };
};

export default useFormik;
