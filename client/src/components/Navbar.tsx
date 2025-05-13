import AvatarComponent from "./Avatar";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center border-b px-10 py-2">
      <div>Medium</div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <AvatarComponent
          className="h-8 w-8 text-xs font-normal"
          name="Nameless D."
        />
      </div>
    </div>
  );
}
