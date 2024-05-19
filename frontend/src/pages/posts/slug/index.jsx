import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Error from "../../../components/error";
import Image from "../../../components/image";
import Loading from "../../../components/loading";
import Separator from "../../../components/ui/separator";
import fetcher from "../../../lib/fetcher";
import { formatDate } from "../../../lib/utils";
import Comments from "./_components/comments";
import LikeButtons from "./_components/like-buttons";

const Post = () => {
  const { slug } = useParams();
  const {
    data: post,
    isPending,
    isError,
  } = useQuery({
    queryKey: [slug],
    queryFn: () => fetcher(`/api/posts/slug/${slug}`),
  });

  if (isError) {
    return <Error actionLabel="Go to home page" actionUrl="/" />;
  }

  if (isPending) {
    return <Loading />;
  }

  const { _id: id, image, title, category, createdAt, description } = post;

  return (
    <div className="flex flex-col md:pl-8">
      <div className="flex flex-col w-full max-w-[900px]">
        <Image
          src={image}
          alt={title}
          className="w-full h-full max-h-[450px]"
        />
        <div className="flex items-center justify-between text-sm mt-2 px-2">
          <p className="text-primary">{category}</p>
          <p className="text-muted-foreground">
            {formatDate({ date: createdAt })}
          </p>
        </div>
        <LikeButtons postId={id} />
        <h1 className="font-bold text-3xl mt-5">{title}</h1>
        <p
          className="mt-10"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <Separator className="mt-10" />
        <Comments postId={id} />
      </div>
    </div>
  );
};

export default Post;
