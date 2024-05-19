import { useSearchParams } from "react-router-dom";
import Error from "../../../components/error";
import Image from "../../../components/image";
import Loading from "../../../components/loading";
import Spinner from "../../../components/spinner";
import Table from "../../../components/ui/table";
import { placeholderImage } from "../../../constants";
import useInfinityQuery from "../../../hooks/use-inifinity-query";
import DeleteButton from "../_components/delete-button";
import RoleTabs from "../_components/role-tabs";
import TableCellCheckBox from "../_components/table-cell-checkbox";
import TableHeaderCheckBox from "../_components/table-header-check-box";
import RoleDropdownMenu from "./_components/role-dropdown-menu";

const Users = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") === "admin" ? "ADMIN" : "USER";
  const {
    data: users,
    isPending,
    isError,
    hasNextPage,
    ref,
  } = useInfinityQuery({
    queryKey: ["users", role],
    api: "/api/users",
    query: {
      role,
    },
  });

  if (isError) {
    return <Error />;
  }

  if (isPending) {
    return <Loading />;
  }

  const userIds = users.map(({ _id }) => _id);

  const headings = [
    {
      key: "checkbox",
      value: <TableHeaderCheckBox ids={userIds} />,
    },
    {
      key: "image",
      value: "Image",
    },
    {
      key: "username",
      value: "Username",
    },
    {
      key: "email",
      value: "Email",
    },
    {
      key: "role",
      value: "Role",
      className: "pl-4",
    },
  ];

  const getImage = ({ image, username }) => {
    return (
      <Image
        src={image || placeholderImage}
        alt={username}
        className="size-12"
      />
    );
  };

  const tableData = users.map((user) => ({
    id: user._id,
    ...(role === "USER"
      ? {
          checkbox: <TableCellCheckBox id={user._id} />,
        }
      : {}),
    image: getImage(user),
    username: user.username,
    email: user.email,
    role: <RoleDropdownMenu user={user} />,
  }));

  if (role === "ADMIN") {
    headings.shift();
  }

  return (
    <div className="flex flex-col gap-3">
      <section className="flex items-center justify-between">
        <RoleTabs />
        <DeleteButton
          ids={userIds}
          modalLabel="Delete Users"
          modalDescription="Are you sure you want to delete selected users? This action cannot be undone!"
        />
      </section>
      <Table headings={headings} data={tableData} />
      {hasNextPage && <Spinner ref={ref} className="mx-auto mt-3" />}
    </div>
  );
};

export default Users;
