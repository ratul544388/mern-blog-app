import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

// eslint-disable-next-line react-refresh/only-export-components
export const buttonVariants = cva(
  "flex gap-2 items-center select-none whitespace-nowrap justify-center text-sm font-medium h-10 rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-white bg-primary hover:bg-primary/90",
        outline: "bg-background shadow-sm border hover:bg-secondary",
        ghost: "hover:bg-accent",
        link: "hover:underline px-0 w-fit",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        navLink:
          "text-base font-normal justify-start gap-3.5 hover:bg-background",
      },
      size: {
        default: "h-9 px-4",
        lg: "h-11 px-5",
        sm: "h-8 px-3",
        icon: "p-0 size-9",
        navLink: "h-12 px-4",
        link: "px-0",
      },
      disabled: {
        true: "opacity-60 pointer-events-none",
        false: "",
      },
      rounded: {
        true: "rounded-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const Button = ({
  className,
  variant = "default",
  size = "default",
  children,
  isLoading,
  loadingLabel,
  disabled,
  scaleOnHover = true,
  ...props
}) => {
  return (
    <motion.button
      whileTap={
        scaleOnHover && {
          scale: 1.05,
        }
      }
      className={cn(
        buttonVariants({ variant, size, className }),
        (isLoading || disabled) && "pointer-events-none opacity-60"
      )}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin size-4" />}
      {loadingLabel && loadingLabel}
      {!loadingLabel && children}
    </motion.button>
  );
};
