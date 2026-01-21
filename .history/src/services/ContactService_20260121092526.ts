import api from "./api";

export const ContactService = {
  createContact: async (data: any) => {
    const response = await api.post("/contacts", data);
    return response.data;
  },

  getAllContacts: async (params?: Record<string, unknown>) => {
    const response = await api.get("/contacts", { params });
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/contacts/${id}/status`, { status });
    return response.data;
  },

  deleteContact: async (id: string) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },
};
