import { useParams } from "react-router";
import useBlog from "@/hooks/useBlog";
import { formatDateString } from "@/utils/date";
import AvatarComponent from "@/components/Avatar";

function Blog() {
  const { blogId } = useParams();
  const { blog, loading } = useBlog(blogId as string);

  if (loading) return <div>Blog Loading...</div>;

  return (
    <div className="mx-auto max-w-4xl grid grid-cols-12">
      <div className="col-span-7 space-y-2.5">
        <div className="text-5xl font-extrabold">{blog?.title}</div>
        <div className="text-slate-500">
          Posted on {formatDateString(blog?.publishedDate as string)}
        </div>
        <div>{blog?.content}</div>
      </div>

      <div className="col-span-5 space-y-2.5">
        <div className="text-slate-600">Author</div>

        <div className="flex items-center gap-3">
          <AvatarComponent
            className="h-7 w-7"
            name={blog?.author.name as string}
          />
          <div>
            <div className="text-xl font-bold">{blog?.author.name}</div>
            <div className="text-slate-900 dark:text-slate-100">
              Master of mirth, purveyor of puns, and the funniest person in the
              kingdom.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
