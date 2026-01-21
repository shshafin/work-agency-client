import api from "./api";

export const UserService = {
  // নিজের প্রোফাইল বা যেকোনো ইউজারের ডেটা আনা
  getSingleUser: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // ইউজার আপডেট করা (Name, Image, Status)
  updateUser: async (id: string, data: any) => {
    const response = await api.patch(`/users/${id}`, { body: data });
    return response.data;
  },

  // সুপার এডমিন নতুন ইউজার ক্রিয়েট করতে পারবে
  createUser: async (data: any) => {
    const response = await api.post("/users/create-user", { body: data });
    return response.data;
  },
};
