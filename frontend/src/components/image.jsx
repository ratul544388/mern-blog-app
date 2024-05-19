import { cn } from "../lib/utils";

const Image = ({ src = "/placeholder/jpg", alt, className }) => {
  return (
    <div
      className={cn(
        "size-32 bg-accent overflow-hidden rounded-md border",
        className
      )}
    >
      <img src={src} alt={alt} className="object-cover size-full" />
    </div>
  );
};

export default Image;
