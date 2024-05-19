import Error from "../../components/error";
import Loading from "../../components/loading";
import PostCard from "../../components/post-card";
import Spinner from "../../components/spinner";
import useInfinityQuery from "../../hooks/use-inifinity-query";
const Home = () => {
  const {
    data: posts,
    isPending,
    isError,
    hasNextPage,
    ref,
  } = useInfinityQuery({
    api: `/api/posts`,
    queryKey: ["posts"],
  });

  if (isError) {
    return <Error />;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <div className="grid xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {posts.map((post) => (
          <PostCard {...post} key={post._id} />
        ))}
      </div>
      {hasNextPage && (
        <>
          <Spinner className="mx-auto mt-5" />
          <span ref={ref} />
        </>
      )}
    </>
  );
};

export default Home;
