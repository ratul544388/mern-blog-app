import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import { Home, LayoutDashboard, Newspaper, Projector } from "lucide-react";
import { useSelector } from "react-redux";

const getNavLinks = (user) => {
  const navlinks = [
    {
      icon: Home,
      label: "Home",
      href: "/",
    },
    {
      icon: Newspaper,
      label: "About",
      href: "/about",
    },
    {
      icon: Projector,
      label: "Projects",
      href: "/projects",
    },
  ];
  if (user) {
    navlinks.push({
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    });
  }

  return navlinks;
};

export const NavLinks = () => {
  const { pathname } = useLocation();
  const { user } = useSelector(({ user }) => user);

  return (
    <nav className="hidden md:flex items-center gap-6">
      {getNavLinks(user).map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            to={href}
            key={label}
            className={cn(
              "py-3 relative font-medium transition-colors text-sm text-gray-500 hover:text-gray-700",
              isActive && "text-primary"
            )}
          >
            {label}
            <motion.span
              className="h-1 bg-primary rounded-full absolute top-3/4 left-0"
              variants={{ active: { width: "100%" }, inActive: { width: 0 } }}
              animate={isActive ? "active" : "inActive"}
            />
          </Link>
        );
      })}
    </nav>
  );
};

NavLinks.Mobile = function MobileNavLinks({ onCloseSidebar }) {
  const { pathname } = useLocation();
  const { user } = useSelector(({ user }) => user);
  return (
    <nav className="flex flex-col">
      {getNavLinks(user).map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            to={href}
            key={label}
            className={cn(
              "flex items-center w-full hover:bg-primary/5 transition-colors rounded-lg gap-4 py-3 px-5 relative font-medium text-sm text-gray-500 hover:text-gray-700",
              isActive && "text-primary bg-primary/5"
            )}
            onClick={onCloseSidebar}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
};
