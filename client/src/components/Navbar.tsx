import { ThemeToggle } from "./theme-toggle";
import AvatarComponent from "./AvatarComponent";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center border-b px-10 py-2">
      <div>Medium</div>
      <div className="flex items-center gap-8">
        <Link
          className="px-3 py-1 bg-green-500 hover:bg-green-400 dark:hover:bg-green-600 rounded-xl"
          to={"/blog/publish"}
        >
          New
        </Link>

        <div className="flex gap-4">
          <ThemeToggle />
          <AvatarComponent
            className="h-8 w-8 text-xs font-normal"
            name="Nameless D."
          />
        </div>
      </div>
    </div>
  );
}
