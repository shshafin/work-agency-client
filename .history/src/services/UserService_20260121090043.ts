import api from "./api";

export const UserService = {
  // ১. সব ইউজার গেট করা (সাথে কুয়েরি প্যারামস সাপোর্ট)
  getAllUsers: async (params?: Record<string, unknown>) => {
    const response = await api.get("/users", { params });
    return response.data;
  },

  // ২. সিঙ্গেল ইউজার গেট করা
  getSingleUser: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // ৩. ইউজার আপডেট করা
  updateUser: async (id: string, data: any) => {
    const response = await api.patch(`/users/${id}`, data);
    return response.data;
  },

  // ৪. নতুন ইউজার (এডমিন/মডারেটর) তৈরি করা
  createUser: async (data: any) => {
    // তোর ব্যাকএন্ড validateRequest অনুযায়ী ডাটা 'body' এর ভেতর থাকতে হবে
    const response = await api.post("/users/create-user", { body: data );
    return response.data;
  },

  // ৫. ইউজার ডিলিট করা (Soft Delete)
  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
