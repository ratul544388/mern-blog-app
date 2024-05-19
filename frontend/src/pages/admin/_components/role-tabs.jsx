import { Link, useLocation, useSearchParams } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { buttonVariants } from "../../../components/ui/button";

const RoleTabs = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("role") === "admin";

  return (
    <div className="flex border rounded-md shadow-sm p-1 gap-1">
      <Link
        to={`${pathname}?role=user`}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          !isAdmin && "bg-accent"
        )}
      >
        User
      </Link>
      <Link
        to={`${pathname}?role=admin`}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          isAdmin && "bg-accent"
        )}
      >
        Admin
      </Link>
    </div>
  );
};

export default RoleTabs;
