import { cn } from "../lib/utils";

const Container = ({
  element: Element = "main",
  children,
  className,
}) => {
  return (
    <Element
      className={cn(
        "w-full px-5 max-w-screen-xl mx-auto",
        Element === "main" && "min-h-[calc(100vh_-_60px)] pt-5",
        className
      )}
    >
      {children}
    </Element>
  );
};

export default Container;
