import { LoaderIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { forwardRef } from "react";

const Spinner = forwardRef(({ className }, ref) => {
  return (
    <LoaderIcon
      ref={ref}
      className={cn("size-10 text-primary animate-spin", className)}
    />
  );
});

Spinner.displayName = "Spinner";

export default Spinner;
