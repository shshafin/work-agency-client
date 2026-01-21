import api from "./api";

export const JobService = {
  getAllJobs: async (params?: Record<string, unknown>) => {
    const response = await api.get("/jobs", { params });
    return response.data;
  },

  getSingleJob: async (id: string) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  createJob: async (data: any) => {
    // ব্যাকএন্ড validateRequest অনুযায়ী data অবশ্যই body প্রপার্টিতে থাকতে হবে
    const response = await api.post("/jobs", { body: data });
    return response.data;
  },

  updateJob: async (id: string, data: any) => {
    const response = await api.patch(`/jobs/${id}`, { body: data });
    return response.data;
  },

  deleteJob: async (id: string) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },
};
