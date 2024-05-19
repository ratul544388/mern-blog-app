import { motion, useAnimate } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

const useConfirmModal = ({ title, description }) => {
  const [promise, setPromise] = useState(null);
  const [scope, animate] = useAnimate();

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = async () => {
    await animate(scope.current, { scale: 0.9 }, { duration: 0.1 });
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const open = promise !== null;

  const ConfirmationDialog = () => {
    return (
      <motion.div
        ref={scope}
        onClick={handleClose}
        className={cn(
          "hidden",
          open &&
            "fixed inset-[-200px] transition-colors duration-200 flex items-center justify-center bg-neutral-900/40 backdrop-blur-sm z-[9999]"
        )}
        variants={{ open: { scale: 1 }, closed: { scale: 0.9 } }}
        transition={{ duration: 0.2 }}
        initial="closed"
        animate={open ? "open" : "closed"}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col bg-background rounded-md p-5 w-full max-w-[400px]"
        >
          <h1 className="font-semibold text-xl">{title}</h1>
          <h1 className="text-muted-foreground text-sm">{description}</h1>
          <Button
            onClick={handleClose}
            autoFocus
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 text-muted-foreground"
          >
            <X className="size-5" />
          </Button>
          <div className="flex items-center justify-end mt-8 gap-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };

  return { ConfirmationDialog, confirm };
};

export default useConfirmModal;
