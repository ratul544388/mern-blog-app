import { motion } from "framer-motion";
import { LogOut, User2 } from "lucide-react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import { Button, buttonVariants } from "../components/ui/button";
import { placeholderImage } from "../constants";
import useLogout from "../hooks/use-logout";
import { cn } from "../lib/utils";
import Image from "./image";

const UserButton = () => {
  const { user: currentUser } = useSelector(({ user }) => user);
  const { LogoutModal, handleLogout } = useLogout();

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };

  useOnClickOutside(containerRef, (e) => handleClose(e));

  return (
    <div className="relative">
      <LogoutModal />
      <Button
        onClick={() => setOpen(!open)}
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full focus:ring-2 focus:ring-primary/50 size-8",
          open && "pointer-events-none"
        )}
      >
        <Image
          src={currentUser.image || placeholderImage}
          alt={currentUser.username}
          className="rounded-full size-8"
        />
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
        className="absolute right-0 top-[calc(100%_+_5px)] bg-background w-[280px] p-5 rounded-lg shadow-lg border"
      >
        <div className="flex items-center gap-3">
          <Image
            src={currentUser.image || placeholderImage}
            alt={currentUser.username}
            className="size-11 rounded-full drop-shadow-sm"
          />
          <div>
            <h3 className="leading-5 text-sm font-medium">
              {currentUser.username}
            </h3>
            <p className="leading-5 text-sm text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-col">
          <Link
            onClick={handleClose}
            to="/profile"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "justify-start text-muted-foreground"
            )}
          >
            <User2 className="size-4" />
            Profile
          </Link>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => {
              handleClose();
              handleLogout();
            }}
            className="text-muted-foreground justify-start"
          >
            <LogOut className="!size-4" />
            Logout
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserButton;
