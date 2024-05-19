import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Container from "../components/container";
import Sidebar from "./sidebar";
import Logo from "../components/logo";
import SearchInput from "../components/search-input";
import UserButton from "../components/user-button";
import { buttonVariants } from "../components/ui/button"

const Header = () => {
  const { user } = useSelector(({ user }) => user);
  const { pathname } = useLocation();
  return (
    <Container
      element="header"
      className="h-[60px] z-50 bg-background sticky top-0 shadow flex items-center justify-between gap-10 max-w-full"
    >
      <div className="flex items-center gap-3">
        <Sidebar.Mobile />
        <Logo />
      </div>
      <SearchInput />
      {user && <UserButton />}
      {!user && (
        <Link
          to={pathname === "/login" ? "/signup" : "/login"}
          className={buttonVariants({ variant: "outline" })}
        >
          {pathname === "/login" ? "Sign up" : "Login"}
        </Link>
      )}
    </Container>
  );
};

export default Header;
