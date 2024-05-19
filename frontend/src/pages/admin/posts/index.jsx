import { Link } from "react-router-dom";
import { placeholderImage } from "../../../../constants";
import Error from "../../../components/error";
import Image from "../../../components/image";
import Loading from "../../../components/loading";
import Table from "../../../components/ui/table";
import useInfinityQuery from "../../../hooks/use-inifinity-query";
import DeleteButton from "../_components/delete-button";
import EditButton from "../_components/edit-button";
import NewButton from "../_components/new-button";
import TableCellCheckbox from "../_components/table-cell-checkbox";
import TableHeaderCheckBox from "../_components/table-header-check-box";
import Spinner from "../../../components/spinner";

const Posts = () => {
  const {
    data: posts,
    isPending,
    hasNextPage,
    isError,
    ref,
  } = useInfinityQuery({
    queryKey: ["posts"],
    api: "/api/posts",
  });

  if (isError) {
    return <Error />;
  }

  if (isPending) {
    return <Loading />;
  }

  const postIds = posts.map(({ _id }) => _id);

  const headings = [
    {
      key: "checkbox",
      value: <TableHeaderCheckBox key="id" ids={postIds} />,
    },
    {
      key: "image",
      value: "Image",
    },
    {
      key: "title",
      value: "Title",
    },
    {
      key: "category",
      value: "Category",
    },
  ];

  const getImage = ({ image, alt }) => {
    return (
      <Image src={image || placeholderImage} alt={alt} className="size-12" />
    );
  };

  const getTitle = ({ title, slug }) => {
    return (
      <Link
        to={`/posts/${slug}`}
        className="line-clamp-3 text-sm font-medium hover:underline hover:text-primary transition-colors"
      >
        {title}
      </Link>
    );
  };

  const tableData = posts.map((post) => ({
    id: post._id,
    checkbox: <TableCellCheckbox id={post._id} />,
    image: getImage(post),
    title: getTitle(post),
    category: post.category,
  }));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-end">
        <div className="flex gap-3">
          <EditButton ids={postIds} />
          <DeleteButton
            modalLabel="Delete Posts"
            modalDescription="Are you sure you want to delete selected posts? This action cannot be undone!"
            ids={postIds}
          />
          <NewButton />
        </div>
      </div>
      <Table headings={headings} data={tableData} />
      {hasNextPage && <Spinner ref={ref} className="mx-auto mt-3" />}
    </div>
  );
};

export default Posts;
