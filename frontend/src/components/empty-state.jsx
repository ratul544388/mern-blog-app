import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { cn } from "../lib/utils";

const EmptyState = ({
  title,
  description,
  actionLabel,
  actionUrl,
  className,
}) => {
  return (
    <div className={cn("flex flex-col items-center mt-20", className)}>
      <h1 className="text-3xl font-semibold text-primary">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
      {actionLabel && actionUrl && (
        <Link to={actionUrl} className={cn(buttonVariants())}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;