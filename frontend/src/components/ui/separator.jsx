import { cn } from "../../lib/utils";

const Separator = ({ className }) => {
  return (
    <span className={cn("h-[0.5px] w-full block bg-gray-300", className)} />
  );
};

export default Separator;
