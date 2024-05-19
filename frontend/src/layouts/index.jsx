import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="p-0 flex max-w-full h-full">
        <Sidebar />
        <div className="py-3 px-5 min-h-[calc(100vh_-_60px)] max-w-screen-2xl mx-auto w-full pb-40">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
