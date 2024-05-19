import { TriangleAlert } from "lucide-react";
import { cn } from "../lib/utils";

const FormError = ({ error, className }) => {
  if (!error) return null;
  return (
    <div
      className={cn(
        "flex w-full items-center text-red-500 text-sm font-medium justify-center gap-3 bg-red-500/20 rounded-md h-10",
        className
      )}
    >
      <TriangleAlert className="!size-4 !mt-[3px]" />
      {error}
    </div>
  );
};

export default FormError;
