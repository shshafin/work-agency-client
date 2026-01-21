import api from "./api";

export const UserService = {
 
  getAllUsers: async (params?: Record<string, unknown>) => {
    const response = await api.get("/users", { params });
    return response.data;
  },

  getSingleUser: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, data: any) => {
    const response = await api.patch(`/users/${id}`, data);
    return response.data;
  },

  createUser: async (data: any) => {
    const response = await api.post("/users/create-user", data);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
