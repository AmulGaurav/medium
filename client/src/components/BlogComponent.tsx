import DOMPurify from "dompurify";
import { formatDateString } from "@/utils/date";
import AvatarComponent from "@/components/AvatarComponent";
import type { IBlog } from "@/types/blog";

function BlogComponent({ blog }: { blog: IBlog }) {
  const safeHTML = DOMPurify.sanitize(blog?.content as string);

  return (
    <div className="grid grid-cols-12 gap-8 px-4">
      <div className="col-span-12 md:col-span-7 order-2 md:order-1 space-y-2.5">
        <div className="text-3xl md:text-5xl font-semibold md:font-extrabold text-center md:text-left">
          {blog?.title}
        </div>
        <div className="text-slate-500 text-center md:text-left">
          Posted on {formatDateString(blog?.publishedDate as string)}
        </div>
        <div dangerouslySetInnerHTML={{ __html: safeHTML }}></div>
      </div>

      <div className="col-span-12 md:col-span-5 order-1 md:order-2 space-y-2.5">
        <div className="text-slate-600">Author</div>

        <div className="flex items-center gap-3">
          <AvatarComponent
            className="h-7 w-7"
            name={blog?.author.name as string}
          />
          <div>
            <div className="text-lg md:text-xl font-bold">
              {blog?.author.name}
            </div>
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

export default BlogComponent;
