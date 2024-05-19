import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostForm from "../_components/post-form";
import Error from "../../../../components/error";
import Loading from "../../../../components/loading";

const EditPost = () => {
  const { id } = useParams();
  const {
    data: post,
    error,
    isPending,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/posts/id/${id}`);
      return data;
    },
  });

  if (error) {
    return <Error />;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center">
      <PostForm
        post={post}
        title="Update Post"
        method="put"
        api={`/api/posts/${id}`}
        buttonLabel="Save"
      />
    </div>
  );
};

export default EditPost;
