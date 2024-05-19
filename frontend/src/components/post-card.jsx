import { Link } from "react-router-dom";
import Image from "./image";
import { formatDate } from "../lib/utils";

const PostCard = ({ image, title, category, createdAt, slug }) => {
  return (
    <Link
      to={`/posts/${slug}`}
      className="rounded-lg border shadow-md overflow-hidden"
    >
      <Image
        src={image}
        alt={title}
        className="aspect-[4/3] w-full rounded-none"
      />
      <div className="p-3">
        <h2 className="font-medium line-clamp-2">{title}</h2>
        <div className="flex items-center justify-between gap-4 mt-2">
          <p className="text-sm text-primary line-clamp-1">{category}</p>
          <p className="text-sm text-muted-foreground">
            {formatDate({ date: createdAt, type: "distance" })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
