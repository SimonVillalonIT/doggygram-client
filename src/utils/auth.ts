import jwt_decode from "jwt-decode";
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
});

interface userData {
  user: string;
  email?: string;
  password: string;
}

export const createOrGetUser = async (response: any) => {
  try {
    const decoded: { name: string; email: string; sub: string } = jwt_decode(
      response.credential
    );
    const userData = {
      user: decoded.name,
      email: decoded.email,
      password: decoded.sub,
    };
    const res = await api.post("user/googleAuth", userData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const refreshToken = async () => {
  try {
    const res = await api.get("/user/refresh");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const googleAuth = async (response: any) => {
  try {
    const result: any = await createOrGetUser(response);
    return result;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const register = async (userData: userData) => {
  const res = await api.post("user/register", userData);
  return res.data;
};

export const logIn = async (userData: userData) => {
  const res = await api.post("user/login", userData);
  return res.data;
};

export const logOut = async () => {
  localStorage.clear();
  sessionStorage.clear();
  document.cookie;
  return await api.get("user/logout");
};
