import api from "./api";

export const UserService = {
  getSingleUser: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, data: any) => {
    const response = await api.patch(`/users/${id}`, { body: data });
    return response.data;
  },

  createUser: async (data: any) => {
    const response = await api.post("/users/create-user", { body: data });
    return response.data;
  },
};
