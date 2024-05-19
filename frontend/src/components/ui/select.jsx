import { motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { buttonVariants } from "../../components/ui/button";
import { cn } from "../../lib/utils";

const Select = ({
  className,
  label,
  value,
  onChange,
  disabled,
  error,
  options,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const activeButtonRef = useRef(null);
  const inputRef = useRef(null);
  const [active, setActive] = useState(0);

  const [filteredValue, setFilteredValue] = useState("");
  const [filteredOptions, setFilteredOptons] = useState(options);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Backspace" && value) {
        return onChange(undefined);
      }

      if (e.key === "Enter") {
        onChange(filteredOptions[active]);
        inputRef.current.blur();
        onClose();
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const activeButtonRect = activeButtonRef.current.getBoundingClientRect();

      if (e.key === "ArrowUp") {
        if (active === 0) {
          setActive(filteredOptions.length - 1);
        } else {
          setActive((prev) => prev - 1);
        }
        if (active === 0) {
          return (containerRef.current.scrollTop =
            containerRef.current.scrollHeight);
        }
        console.log(activeButtonRect.bottom, containerRect.top);
        if (activeButtonRect.bottom < containerRect.top + 80) {
          containerRef.current.scrollTop -= 40;
        }
        e.preventDefault();
        return;
      }

      if (e.key === "ArrowDown") {
        if (active === filteredOptions.length - 1) {
          setActive(0);
        } else {
          setActive((prev) => prev + 1);
        }

        if (active === filteredOptions.length - 1) {
          return (containerRef.current.scrollTop = 0);
        }
        if (activeButtonRect.bottom + 40 > containerRect.bottom) {
          containerRef.current.scrollTop += 40;
        }
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active, filteredOptions]);

  const onClose = () => {
    setOpen(false);
  };

  const onChangeFilteredValue = (e) => {
    const inputValue = e.target.value;
    setFilteredValue(e.target.value);
    const newFilteredValue = options.filter((option) => {
      return option.toLowerCase().includes(inputValue.toLowerCase());
    });

    setFilteredOptons(newFilteredValue);
    e.preventDefault();
  };

  useOnClickOutside(containerRef, onClose);

  return (
    <div className={cn("w-full", disabled && "pointer-events-none opacity-60")}>
      <div className={cn("relative group w-full", className)}>
        <input
          onFocus={() => setOpen(true)}
          value={filteredValue}
          onChange={onChangeFilteredValue}
          className={cn(
            "peer ring-[1.5px] ring-foreground/30 hover:ring-foreground/50 focus:ring-[2.3px] focus:ring-primary rounded-sm h-14 w-full outline-none px-3",
            open && "pointer-events-none",
            value && "text-transparent caret-transparent",
            error &&
              "ring-red-500 border-0 focus:ring-red-500 hover:ring-red-500"
          )}
          {...props}
          ref={inputRef}
        />
        <label
          className={cn(
            "absolute left-1 top-1/2 -translate-y-1/2 px-2 bg-background transition-all peer-focus:-top-0.5 peer-focus:text-sm",
            value && "-top-0.5 text-sm",
            error && "text-red-500 peer-focus:text-red-500"
          )}
        >
          {label}
        </label>
        <div className="absolute flex items-center justify-between inset-0 px-3 pointer-events-none">
          <p>{value}</p>
          <div className="flex items-center gap-1">
            <div
              role="button"
              onClick={() => {
                onChange(undefined);
                setFilteredOptons(options);
                setFilteredValue("");
              }}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  rounded: true,
                }),
                "pointer-events-auto hover:text-red-500 text-muted-foreground",
                !value && "hidden"
              )}
            >
              <X className="size-5" />
            </div>
            <ChevronDown className="size-5 text-muted-foreground" />
          </div>
          <motion.div
            ref={containerRef}
            variants={{
              open: { scale: 1, opacity: 1, pointerEvents: "auto" },
              closed: { scale: 0.95, opacity: 0, pointerEvents: "none" },
            }}
            initial="closed"
            animate={open ? "open" : "closed"}
            style={{
              scrollBehavior: "smooth",
            }}
            className={cn(
              "absolute max-h-[50vh] top-[calc(100%_+_4px)] z-10 overflow-y-auto pointer-events-auto inset-x-0 rounded-lg shadow-md bg-background border p-2"
            )}
          >
            {filteredOptions.map((option) => {
              const isActive = filteredOptions[active] === option;
              return (
                <button
                  type="button"
                  ref={isActive ? activeButtonRef : null}
                  className={cn(
                    "w-full flex justify-start px-4 items-center h-10 rounded-md hover:bg-secondary transition-colors text-sm font-medium",
                    isActive && "bg-secondary"
                  )}
                  key={option}
                  onClick={() => {
                    onChange(option);
                    onClose();
                  }}
                >
                  {option}
                  <Check
                    className={cn(
                      "hidden ml-auto size-4",
                      option === value && "block"
                    )}
                  />
                </button>
              );
            })}
            {filteredOptions.length === 0 && (
              <p className="text-sm text-center font-medium py-5 text-muted-foreground">
                No results found
              </p>
            )}
          </motion.div>
        </div>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Select;