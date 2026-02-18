import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export const userRegister = async (values: RegisterPayload) => {
  const { data } = await axiosInstance.post("/user/register/", values);

  return data;
};

export const userLogin = async (values: LoginPayload) => {
  const { data } = await axiosInstance.post("/user/login/", values);
  return data;
};

export const useUserRegisterMutation = () => {
  return useMutation({
    mutationFn: userRegister,
  });
};

export const useUserLoginMutation = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};
