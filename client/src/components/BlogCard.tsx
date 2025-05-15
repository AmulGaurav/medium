import AvatarComponent from "./Avatar";
import { formatDateString } from "@/utils/date";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

function BlogCard({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 py-7">
      <div className="flex items-center gap-1.5">
        <AvatarComponent name={authorName} />
        <div>
          <span className="text-xs font-light">{authorName}</span> ·{" "}
          <span className="text-xs font-extralight text-slate-500">
            {formatDateString(publishedDate)}
          </span>
        </div>
      </div>

      <div className="py-4">
        <div className="text-lg font-semibold">{title}</div>

        <div className="text-[15.5px]">
          {content.split(" ").slice(0, 26).join(" ") + "..."}
        </div>
      </div>

      <div className="text-xs text-slate-500">
        {content.split(" ").length / 200}
        {" min read"}
      </div>
    </div>
  );
}

export default BlogCard;
