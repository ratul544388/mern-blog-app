import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const Logo = ({ href = "/", className }) => {
  return (
    <Link
      to={href}
      className={cn(
        "font-bold block text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500",
        className
      )}
    >
      MernEat
    </Link>
  );
};

export default Logo;
