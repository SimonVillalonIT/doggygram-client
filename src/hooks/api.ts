import axios from "axios";
import { useTokenStore } from "@/store/tokenStore";

const useApi = () => {
  const { token } = useTokenStore((state) => ({ token: state.token }));
  console.log(token);
  const api = axios.create({
    baseURL: "http://localhost:8080/api/",
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return api;
};

export default useApi;
