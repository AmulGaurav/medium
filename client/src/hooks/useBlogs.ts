import type { IBlog } from "@/types/blog";
import { apiClient } from "@/utils/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function useBlogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    apiClient
      .get("/blog/bulk", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => setBlogs(data.blogs))
      .catch((err) => {
        if (err?.response?.data?.message)
          toast.error(err?.response?.data?.message);
        else toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { blogs, loading };
}

export default useBlogs;
