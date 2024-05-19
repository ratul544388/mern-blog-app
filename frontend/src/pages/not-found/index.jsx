import { Link } from "react-router-dom";
import { buttonVariants } from "../../components/ui/button";
import { cn } from "../../lib/utils";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="font-extrabold text-8xl bg-cover text-primary">Opps!</h1>
      <h2 className="font-bold text-xl mt-6">404 - PAGE NOT FOUND</h2>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        We couldn&apos;t find the page you requested. It might be unavailable or
        the URL might be incorrect.
      </p>
      <Link to="/" className={cn(buttonVariants(), "mt-5")}>
        GO TO HOMEPAGE
      </Link>
    </div>
  );
};

export default NotFound;
