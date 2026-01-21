import api from "./api";

export const ApplicationService = {
  // ১. নতুন অ্যাপ্লিকেশন সাবমিট করা
  applyJob: async (formData: FormData) => {
    const response = await api.post("/applications/apply", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // ২. সব অ্যাপ্লিকেশন গেট করা (এডমিন প্যানেলের জন্য)
  getAllApplications: async (params?: Record<string, unknown>) => {
    const response = await api.get("/applications", { params });
    return response.data;
  },

  getSingleApplication: async (id: string) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },

  // ৩. স্ট্যাটাস আপডেট করা
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/applications/${id}/status`, { status });
    return response.data;
  },
};
