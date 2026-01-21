import api from "./api";

export const UserService = {
  getSingleUser: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

 import api from "./api";

export const UserService = {
  updateUser: async (id: string, data: any) => {
    // পোস্টম্যানে যেহেতু সরাসরি ডাটা দিলে কাজ করছে, এখানেও তাই করবো
    const response = await api.patch(`/users/${id}`, data); 
    return response.data;
  },
  // ... বাকিগুলো
};

  createUser: async (data: any) => {
    const response = await api.post("/users/create-user", { body: data });
    return response.data;
  },
};
