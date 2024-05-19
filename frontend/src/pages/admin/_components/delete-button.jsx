import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import useCheckedIdsStore from "../../../hooks/use-checked-ids-store";
import useMutate from "../../../hooks/use-mutate";
import useConfirmModal from "../../../hooks/user-confirm-modal";

const DeleteButton = ({ ids, modalLabel, modalDescription }) => {
  const { checkedIds, onResetCheckedIds } = useCheckedIdsStore();
  const { ConfirmationDialog, confirm } = useConfirmModal({
    title: modalLabel,
    description: modalDescription,
  });

  const { isPending, mutateAsync } = useMutate();

  const handleDelete = () => {
    mutateAsync({
      api: "/api/posts/delete",
      queryKey: "posts",
      method: "delete",
      data: {
        postIds: checkedIds,
      },
      onSuccess: () => {
        const message =
          checkedIds.length > 1 ? "Posts Deleted" : "Post deleted";
        toast.success(message);
        onResetCheckedIds();
      },
    });
  };

  const selectedIds = ids.filter((id) => checkedIds.includes(id));

  if (selectedIds.length === 0) {
    return null;
  }

  return (
    <>
      <ConfirmationDialog />
      <Button
        onClick={async () => {
          const ok = await confirm();
          if (ok) handleDelete();
        }}
        variant="destructive"
        disabled={isPending}
      >
        <Trash2 className="size-4" />
        Delete
      </Button>
    </>
  );
};

export default DeleteButton;
