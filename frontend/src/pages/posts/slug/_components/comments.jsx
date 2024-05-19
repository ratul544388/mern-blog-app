import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  LoaderIcon,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Error from "../../../../components/error";
import Spinner from "../../../../components/spinner";
import { Button } from "../../../../components/ui/button";
import Separator from "../../../../components/ui/separator";
import useInfinityQuery from "../../../../hooks/use-inifinity-query";
import useQueryString from "../../../../hooks/use-query-string";
import CommentBox from "./comment-box";
import CommentForm from "./comment-form";

const Comments = ({ postId }) => {
  const [searchParams] = useSearchParams();
  const orderBy = searchParams.get("orderBy") === "-1" ? "-1" : "1";
  const queryPush = useQueryString();

  const {
    data: comments,
    hasNextPage,
    isError,
    isPending,
    ref,
  } = useInfinityQuery({
    api: `/api/comments`,
    query: {
      postId,
      orderBy,
    },
    queryKey: ["comments", orderBy],
  });

  if (isError) {
    return <Error />;
  }

  if (isPending) {
    return (
      <LoaderIcon className="mx-auto mt-8 size-10 text-primary animate-spin" />
    );
  }

  const changeOrderBy = () => {
    queryPush({ orderBy: orderBy === "-1" ? 1 : -1 });
  };

  const ArrowIcon = orderBy === "-1" ? ArrowUpNarrowWide : ArrowDownNarrowWide;

  return (
    <section className="mt-12">
      <div className="flex items-center gap-3">
        <Button onClick={changeOrderBy} variant="outline" size="icon">
          <ArrowIcon className="size-4" />
        </Button>
        <h2 className="text-xl font-medium">Comments</h2>
      </div>
      <Separator className="mt-3" />
      <CommentForm postId={postId} />
      <Separator className="mt-5" />
      <ul className="flex flex-col gap-3 mt-5">
        {comments.map((comment) => (
          <li key={comment._id}>
            <CommentBox key={comment._id} comment={comment} />
            <Separator className="mt-3" />
          </li>
        ))}
      </ul>
      {hasNextPage && <Spinner ref={ref} className="mx-auto mt-5" />}
      {comments?.length === 0 && (
        <p className="text-muted-foreground pl-3">No Comments Yet</p>
      )}
    </section>
  );
};

export default Comments;
