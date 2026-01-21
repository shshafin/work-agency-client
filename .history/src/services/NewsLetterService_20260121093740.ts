import api from "./api";

export const NewsletterService = {
 
  subscribe: async (email: string) => {
    const response = await api.post("/newsletter/subscribe", { email });
    return response.data;
  },


  getAllSubscribers: async (params?: Record<string, unknown>) => {
    const response = await api.get("/newsletter/subscribers", { params });
    return response.data;
  },

  // ৩. সাবস্ক্রাইবার ডিলিট করা
  deleteSubscriber: async (id: string) => {
    const response = await api.delete(`/newsletter/${id}`);
    return response.data;
  },
};
