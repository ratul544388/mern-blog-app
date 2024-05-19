import { Check } from "lucide-react";
import DropdownMenu from "../../../../components/ui/dropdown-menu";
import useMutate from "../../../../hooks/use-mutate";
import { formatText } from "../../../../lib/utils";

const RoleDropdownMenu = ({ user: { role, _id: id } }) => {
  const { mutateAsync, isPending } = useMutate();
  const trigger = {
    children: formatText(role),
    icon: true,
  };

  const handleChangeRole = () => {
    const newRole = role === "ADMIN" ? "USER" : "ADMIN";
    mutateAsync({
      api: `/api/users/change-role/${id}/${newRole}`,
      queryKey: "users",
      method: "put",
      successMessage: "Success",
    });
  };

  const items = [
    {
      label: "User",
      icon: Check,
      onClick: handleChangeRole,
      className:
        "flex-row-reverse justify-start mr-auto min-w-[100px] justify-between",
      iconClassName: role === "ADMIN" && "opacity-0",
      disabled: isPending,
    },
    {
      label: "Admin",
      icon: Check,
      onClick: handleChangeRole,
      className: "min-w-[100px] flex-row-reverse justify-between",
      iconClassName: role !== "ADMIN" && "opacity-0",
      disabled: isPending,
    },
  ];
  return <DropdownMenu trigger={trigger} items={items} />;
};

export default RoleDropdownMenu;
