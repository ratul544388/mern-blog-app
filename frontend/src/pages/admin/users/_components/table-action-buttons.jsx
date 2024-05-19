import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import useMutate from "../../../../hooks/use-mutate";
import useConfirmModal from "../../../../hooks/user-confirm-modal";
import RoleTabs from "../../_components/role-tabs";

const TableActionButtons = ({ users }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { ConfirmationDialog, confirm } = useConfirmModal({
    title: "Delete Users",
    description:
      "Are you sure you want to delete these select users? This action cannot be undone!",
  });
  const checkedIds = searchParams.get("checked-ids")?.split("+") || [];

  const { isPending, mutateAsync } = useMutate();

  const handleDelete = () => {
    mutateAsync({
      api: "/api/users/delete",
      queryKey: "users",
      method: "delete",
      data: {
        userIds: checkedIds,
      },
      onSuccess: () => {
        toast.success("Users deleted");
      },
    });
  };

  useEffect(() => {
    if (
      checkedIds.length &&
      !users.some(({ _id }) => checkedIds.includes(_id))
    ) {
      navigate("/admin/users");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="flex items-center gap-3">
      <ConfirmationDialog />
      <RoleTabs />
      <Button
        onClick={async () => {
          const ok = await confirm();
          if (ok) handleDelete();
        }}
        variant="destructive"
        disabled={
          isPending ||
          checkedIds.length === 0 ||
          users.every(({ _id }) => !checkedIds.includes({ _id }))
        }
      >
        <Trash2 className="size-4" />
        Delete
      </Button>
    </div>
  );
};

export default TableActionButtons;
