import { useParams } from "react-router";
import useBlog from "@/hooks/useBlog";
import BlogComponent from "@/components/BlogComponent";
import type { IBlog } from "@/types/blog";
import BlogShimmer from "@/components/BlogShimmer";

function Blog() {
  const { blogId } = useParams();
  const { blog, loading } = useBlog(blogId as string);

  return (
    <div className="mx-auto max-w-4xl pt-4 md:pt-7 pb-4">
      {loading ? <BlogShimmer /> : <BlogComponent blog={blog as IBlog} />}
    </div>
  );
}

export default Blog;
