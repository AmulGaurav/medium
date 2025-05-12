import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    import.meta.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1" ||
    "http://localhost:3001/api/v1",
});
