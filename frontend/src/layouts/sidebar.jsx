import { motion } from "framer-motion";
import {
  CircleHelp,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  User,
  Users2,
  X
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Logo from "../components/logo";
import { Button, buttonVariants } from "../components/ui/button";
import useLogout from "../hooks/use-logout";
import { cn } from "../lib/utils";

const sidebarLinks = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    isAdminRoute: true,
  },
  {
    label: "Posts",
    href: "/admin/posts",
    icon: Newspaper,
    isAdminRoute: true,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users2,
    isAdminRoute: true,
  },
  {
    label: "About",
    href: "/about",
    icon: CircleHelp,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
    isPrivateRoute: true,
  },
];

const Sidebar = () => {
  return (
    <aside className="sticky z-[40] md:flex px-5 py-3 flex-col left-0 h-[calc(100vh_-_60px)] bg-secondary border-r shadow-lg min-w-[240px] top-[60px] hidden">
      <SidebarItems />
    </aside>
  );
};

Sidebar.Mobile = function MobileSidebar() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <aside className="md:hidden">
      <Button onClick={handleOpen} variant="ghost" size="icon">
        <Menu className="size-5" />
      </Button>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={{ open: { x: 0 }, closed: { x: "-100%" } }}
        initial="closed"
        animate={open ? "open" : "closed"}
        transition={{ duration: 0.3 }}
        className="fixed py-3 px-5 left-0 z-[100] bg-secondary border-r inset-y-0 w-3/4 max-w-[350px]"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute right-2 top-2 z-[110]"
        >
          <X className="size-5" />
        </Button>
        <SidebarItems hasLogo onCloseSidebar={handleClose} />
      </motion.div>
      <span
        onClick={handleClose}
        className={cn(
          "fixed z-[90] opacity-0 pointer-events-none transition-all duration-300 inset-0 bg-neutral-900/20 backdrop-blur-sm",
          open && "opacity-100 pointer-events-auto"
        )}
      />
    </aside>
  );
};

const SidebarItems = ({ hasLogo, onCloseSidebar }) => {
  const { pathname } = useLocation();
  const { user } = useSelector(({ user }) => user);
  const { LogoutModal, handleLogout } = useLogout();
  return (
    <div className="flex h-full flex-col">
      <LogoutModal />
      {hasLogo && <Logo className="mb-5" />}
      <nav className="flex flex-col">
        {sidebarLinks.map(
          ({ href, icon: Icon, label, isAdminRoute, isPrivateRoute }) => {
            const isActive = pathname === href;
            return (
              <Link
                to={href}
                onClick={onCloseSidebar}
                key={label}
                className={cn(
                  buttonVariants({ variant: "navLink", size: "navLink" }),
                  isPrivateRoute && !user && "hidden",
                  isAdminRoute && user?.role !== "ADMIN" && "hidden",
                  label === "Profile" && "mt-auto",
                  isActive &&
                    "bg-primary hover:bg-primary/90 text-white font-medium"
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          }
        )}
      </nav>
      {user && (
        <Button
          onClick={handleLogout}
          variant="navLink"
          size="navLink"
          className="mt-auto"
        >
          <LogOut className="size-4" />
          Logout
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
