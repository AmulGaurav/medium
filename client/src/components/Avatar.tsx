import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function AvatarComponent({
  className,
  name,
}: {
  className?: string;
  name: string;
}) {
  return (
    <Avatar className={cn("h-6 w-6 text-[10px] font-light", className)}>
      <AvatarFallback className="bg-slate-200 dark:bg-slate-800">
        {name
          .split(" ")
          .slice(0, 2)
          .map((word) => word.charAt(0).toUpperCase())
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}

export default AvatarComponent;
