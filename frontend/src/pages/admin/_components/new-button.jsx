import { PlusCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { buttonVariants } from "../../../components/ui/button";

const NewButton = () => {
  const { pathname } = useLocation();
  const href = pathname + "/new";
  return (
    <Link to={href} className={cn(buttonVariants())}>
      Add new
      <PlusCircle className="size-4" />
    </Link>
  );
};

export default NewButton;
