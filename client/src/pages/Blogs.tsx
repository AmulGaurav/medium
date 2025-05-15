import BlogCard from "@/components/BlogCard";
import useBlogs from "@/hooks/useBlogs";
import { Link } from "react-router";

function Blogs() {
  const { blogs, loading } = useBlogs();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-xl">
      {blogs.map((blog) => (
        <Link to={`/blog/${blog.id}`} key={blog.id} className="cursor-pointer">
          <BlogCard
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedDate={blog.publishedDate}
          />
        </Link>
      ))}

      <BlogCard
        authorName="Nameless D. Luffy"
        title="How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing"
        content="No need to create a fancy and modern website with hundreds of pages to make money online. - Making money online is the dream for man"
        publishedDate="13 May 2025"
      />
      <BlogCard
        authorName="Nameless D. Luffy"
        title="How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing"
        content="No need to create a fancy and modern website with hundreds of pages to make money online. - Making money online is the dream for man"
        publishedDate="13 May 2025"
      />
    </div>
  );
}

export default Blogs;
