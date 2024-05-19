import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { Button } from "../../../../components/ui/button";
import Skeleton from "../../../../components/ui/skeleton";
import fetcher from "../../../../lib/fetcher";
import { toast } from "sonner";
import { cn } from "../../../../lib/utils";

const LikeButtons = ({ postId }) => {
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useQuery({
    queryKey: ["likes"],
    queryFn: () => fetcher(`/api/likes`, { postId }),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (type) => {
      const { data } = await axios.post(
        `/api/likes`,
        {},
        { params: { postId, type } }
      );
      return data;
    },
    onMutate: async (type) => {
      await queryClient.cancelQueries(["likes"]);
      let newLike = {
        likeCount,
        dislikeCount,
        isLiked,
        isDisliked,
      };

      const stateTransitions = {
        none: {
          like: { likeCount: likeCount + 1, isLiked: true, isDisliked: false },
          dislike: {
            dislikeCount: dislikeCount + 1,
            isLiked: false,
            isDisliked: true,
          },
        },
        liked: {
          like: { likeCount: likeCount - 1, isLiked: false, isDisliked: false },
          dislike: {
            likeCount: likeCount - 1,
            dislikeCount: dislikeCount + 1,
            isLiked: false,
            isDisliked: true,
          },
        },
        disliked: {
          like: {
            likeCount: likeCount + 1,
            dislikeCount: dislikeCount - 1,
            isLiked: true,
            isDisliked: false,
          },
          dislike: {
            dislikeCount: dislikeCount - 1,
            isLiked: false,
            isDisliked: false,
          },
        },
      };

      let currentState = "none";
      if (isLiked) currentState = "liked";
      if (isDisliked) currentState = "disliked";

      newLike = {
        ...newLike,
        ...stateTransitions[currentState][type],
      };

      const previousLikes = queryClient.getQueryData(["likes"]);
      queryClient.setQueryData(["likes"], newLike);
      return { previousLikes };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["likes"], context?.previousLikes);
      toast.error("Something went wrong");
    },
  });

  if (isPending) {
    return <Skeleton className="h-10 mt-4 rounded-full w-28" />;
  }

  if (isError) {
    return "Error";
  }

  const { likeCount, dislikeCount, isLiked, isDisliked } = data;

  const LikeIcon = isLiked ? AiFillLike : AiOutlineLike;
  const DislikeIcon = isDisliked ? AiFillDislike : AiOutlineDislike;

  return (
    <div className="rounded-full flex border w-fit mt-4">
      <Button
        onClick={() => mutateAsync("like")}
        variant="ghost"
        className={cn(
          "rounded-r-none rounded-l-full px-3",
          isLiked && "text-primary"
        )}
      >
        <LikeIcon className="size-5 text-primary" />
        {likeCount}
      </Button>
      <Button
        onClick={() => mutateAsync("dislike")}
        variant="ghost"
        className={cn(
          "rounded-r-full rounded-l-none px-3",
          isDisliked && "text-primary"
        )}
      >
        {dislikeCount}
        <DislikeIcon className="size-5 text-primary" />
      </Button>
    </div>
  );
};

export default LikeButtons;
