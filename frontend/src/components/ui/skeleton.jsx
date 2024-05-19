import { cn } from "../../lib/utils";

const Skeleton = ({ className }) => {
  return <span className={cn("block bg-primary/10 animate-pulse rounded-md", className)} />;
};

export default Skeleton;
