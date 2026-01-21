import api from "./api";

export const ContactService = {
  createContact: async (data: any) => {
    const response = await api.post("/contacts", data);
    return response.data;
  },
};
