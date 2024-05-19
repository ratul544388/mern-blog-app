import { useQuery } from "@tanstack/react-query";
import Error from "../../../components/error";
import Loading from "../../../components/loading";
import PostCard from "../../../components/post-card";
import fetcher from "../../../lib/fetcher";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
const Search = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const navigate = useNavigate();

  useEffect(() => {
    if (!q) {
      navigate("/");
    }
  }, [q, navigate]);

  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    queryKey: ["searchedPosts", q],
    queryFn: () => fetcher(`/api/posts`, { q }),
  });

  if (error) {
    return <Error />;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-5 mt-2">
      <h1 className="font-semibold text-2xl text-muted-foreground">
        Search results for <span className="text-foreground">{`"${q}"`}</span>{" "}
      </h1>
      <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {posts?.map((post) => (
          <PostCard {...post} key={post._id} />
        ))}
      </section>
    </div>
  );
};

export default Search;
