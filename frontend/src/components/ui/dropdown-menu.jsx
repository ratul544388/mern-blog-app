import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Button } from "./button";
import { cn } from "../../lib/utils";

const DropdownMenu = ({ items, trigger, className, disabled }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };

  useOnClickOutside(containerRef, (e) => handleClose(e));

  return (
    <div className={cn("relative w-fit", className)}>
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full",
          open && "pointer-events-none",
          trigger.className
        )}
        disabled={disabled}
      >
        {trigger.children}
        {trigger.icon && (
          <ChevronDown
            className={cn("size-4 transition-all", open && "rotate-180")}
          />
        )}
      </Button>
      <motion.div
        ref={containerRef}
        variants={{
          open: { scale: 1, pointerEvents: "auto", opacity: 1 },
          closed: { scale: 0.9, pointerEvents: "none", opacity: 0 },
        }}
        transition={{ duration: 0.15 }}
        animate={open ? "open" : "closed"}
        initial="closed"
        className="absolute z-[150] right-0 top-[calc(100%_+_5px)] bg-background p-2 rounded-lg shadow-lg border"
      >
        {items.map(
          ({
            label,
            href,
            icon: Icon,
            className,
            element: Element = Button,
            onClick,
            iconClassName,
            destructive,
          }) => (
            <Element
              variant="ghost"
              className={cn(
                "w-full h-11 justify-start min-w-[150px]",
                destructive && "text-red-500 bg-red-50 hover:bg-red-100",
                className
              )}
              onClick={() => {
                handleClose();
                onClick();
              }}
              href={href}
              key={label}
            >
              {Icon && <Icon className={cn("size-4", iconClassName)} />}
              {label}
            </Element>
          )
        )}
      </motion.div>
    </div>
  );
};

export default DropdownMenu;
