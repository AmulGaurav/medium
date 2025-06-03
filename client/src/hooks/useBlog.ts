import type { IBlog } from "@/types/blog";
import { apiClient } from "@/utils/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function useBlog(blogId: string) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<IBlog>();

  useEffect(() => {
    apiClient
      .get(`/blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => setBlog(data.blog))
      .catch((err) => {
        if (err?.response?.data?.message)
          toast.error(err?.response?.data?.message);
        else toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, [blogId]);

  return { blog, loading };
}

export default useBlog;
