import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { buttonVariants } from "../components/ui/button";

const Error = ({
  title = "An unknown error occured!",
  className,
  actionLabel,
  actionUrl,
}) => {
  return (
    <div
      className={cn("flex flex-col h-full items-center justify-center", className)}
    >
      <CircleAlert className="size-20 text-muted-foreground" />
      <p className="mt-1">{title}</p>
      {actionLabel && actionUrl && (
        <Link
          to={actionUrl}
          className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default Error;
