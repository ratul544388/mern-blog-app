import { Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

const Checkbox = ({ className, onClick, checked = false }) => {
  return (
    <Button
      variant={checked ? "default" : "ghost"}
      size="icon"
      onClick={onClick}
      type="checkbox"
      className={cn("rounded-sm size-5", className)}
    >
      <Check className={cn("size-3.5", !checked && "hidden")} />
    </Button>
  );
};

export default Checkbox;
