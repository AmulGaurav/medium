import { apiClient } from "@/utils/axios";
import { useEffect, useState } from "react";

interface IBlog {
  id: string;
  title: string;
  content: string;
  publishedDate: string;
  author: { name: string };
}

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
          console.error(err?.response?.data?.message);
        else console.error(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { blogs, loading };
}

export default useBlogs;
