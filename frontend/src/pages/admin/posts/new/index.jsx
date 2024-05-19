import PostForm from "../_components/post-form";

const New = () => {
  return (
    <div className="flex items-center justify-center">
      <PostForm
        title="Create a new Post"
        api="/api/posts"
        method="post"
        buttonLabel="Submit"
      />
    </div>
  );
};

export default New;
