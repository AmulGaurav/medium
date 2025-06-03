import { ThemeToggle } from "./theme-toggle";
import AvatarComponent from "./AvatarComponent";
import { Link, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUserStore from "@/store/userStore";

export default function Navbar() {
  const name = useUserStore((state) => state.username);

  return (
    <div className="sticky top-0 z-50 flex justify-between items-center border-b px-4 sm:px-6 md:px-10 py-3 md:py-3.5 bg-white/70 dark:bg-black/30 backdrop-blur-sm">
      <Link className="font-medium" to={"/"}>
        Medium
      </Link>

      <div className="flex items-center gap-6 md:gap-8">
        {name && (
          <Link
            className="px-2.5 md:px-3 py-0.5 md:py-1 bg-green-500 hover:bg-green-400 dark:hover:bg-green-600 rounded-xl"
            to={"/blog/publish"}
          >
            New
          </Link>
        )}

        <div className="flex gap-2 md:gap-5">
          <ThemeToggle />
          {name && <MyProfile name={name} />}
        </div>
      </div>
    </div>
  );
}

function MyProfile({ name }: { name: string }) {
  const navigate = useNavigate();
  const setName = useUserStore((state) => state.setUsername);

  const handleLogout = () => {
    localStorage.clear();
    setName("");
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <AvatarComponent className="h-8 w-8 text-xs font-normal" name={name} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 mt-1">
        <DropdownMenuCheckboxItem>
          <button
            className="text-red-400 cursor-pointer"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
