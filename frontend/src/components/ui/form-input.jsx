import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/utils";
import { forwardRef, useState } from "react";

const FormInput = forwardRef(
  ({ className, type, label, error, ...props }, ref) => {
    const [isPassword, setIsPassword] = useState(type === "password");

    return (
      <div className="w-full">
        <div className={cn("relative group", className)}>
          <input
            type={isPassword ? "password" : "text"}
            placeholder=" "
            className={cn(
              "peer ring-[1.5px] border-none ring-foreground/30 hover:ring-foreground/50 focus:ring-[2.3px] focus:ring-primary rounded-sm h-14 w-full outline-none px-3",
              error &&
                "ring-red-500 border-0 focus:ring-red-500 hover:ring-red-500"
            )}
            {...props}
            ref={ref}
          />
          <label
            className={cn(
              "pointer-events-none absolute left-1 transition-all peer-focus:top-0 peer-focus:text-primary peer-focus:text-sm text-sm peer-placeholder-shown:text-base px-2 top-0 peer-placeholder-shown:top-1/2 text-primary peer-placeholder-shown:text-foreground -translate-y-[calc(50%_+_4px)] bg-background rounded-full",
              error && "text-red-500 peer-focus:text-red-500"
            )}
          >
            {label}
          </label>
          {type === "password" && (
            <div
              onClick={() => setIsPassword(!isPassword)}
              role="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full group/password size-8 grid place-content-center hover:bg-primary/10"
            >
              {isPassword && (
                <Eye className="size-5 text-muted-foreground group-hover/password:text-primary transition-colors" />
              )}
              {!isPassword && (
                <EyeOff className="size-5 text-muted-foreground group-hover/password:text-primary transition-colors" />
              )}
            </div>
          )}
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
