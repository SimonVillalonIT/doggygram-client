import jwt_decode from "jwt-decode";
import axios from "axios";

export const api = (type?: string, token?: string) => {
  let server;
  token
    ? (server = axios.create({
        baseURL: "http://localhost:8080/api/",
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": type ? type : null,
        },
      }))
    : (server = axios.create({
        baseURL: "http://localhost:8080/api/",
        withCredentials: true,
      }));
  return server;
};

interface userData {
  user: string;
  email?: string;
  password: string;
}

export const createOrGetUser = async (response: any) => {
  const server = api("aplication/json");
  try {
    const decoded: { name: string; email: string; sub: string } = jwt_decode(
      response.credential
    );
    const userData = {
      user: decoded.name,
      email: decoded.email,
      password: decoded.sub,
    };
    const res = await server.post("user/googleAuth", userData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const refreshToken = async () => {
  const server = api("aplication/json");
  try {
    const res = await server.get("/user/refresh");
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
  const server = api("aplication/json");
  const res = await server.post("user/register", userData);
  return res.data;
};

export const logIn = async (userData: userData) => {
  const server = api("aplication/json");
  const res = await server.post("user/login", userData);
  return res.data;
};

export const logOut = async () => {
  const server = api("aplication/json");
  localStorage.clear();
  sessionStorage.clear();
  document.cookie;
  return await server.get("user/logout");
};
