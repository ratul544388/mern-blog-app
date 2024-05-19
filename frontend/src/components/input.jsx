import { cn } from "../lib/utils";

const Input = ({ className, ...props }) => {
  return (
    <input
      type="text"
      id="simple-search"
      className={cn(
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 p-2.5",
        className
      )}
      placeholder="Search branch name..."
      {...props}
    />
  );
};

export default Input;