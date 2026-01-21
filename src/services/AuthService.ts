import api from "./api";

export const AuthService = {
  login: async (data: any) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },
  changePassword: async (data: any) => {
    const response = await api.post("/auth/change-password", data);
    return response.data;
  },
};
