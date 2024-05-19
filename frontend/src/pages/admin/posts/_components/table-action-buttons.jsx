import { PlusCircle, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button, buttonVariants } from "../../../../components/ui/button";
import useCheckedIdsStore from "../../../../hooks/use-checked-ids-store";
import useMutate from "../../../../hooks/use-mutate";
import useConfirmModal from "../../../../hooks/user-confirm-modal";
import { cn } from "../../../../lib/utils";

const TableActionButtons = () => {
  const { checkedIds, onResetCheckedIds } = useCheckedIdsStore();
  const { ConfirmationDialog, confirm } = useConfirmModal({
    title: "Delete Users",
    description:
      "Are you sure you want to delete these select posts? This action cannot be undone!",
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

  return (
    <div className="flex gap-3">
      <ConfirmationDialog />
      <Button
        onClick={async () => {
          const ok = await confirm();
          if (ok) handleDelete();
        }}
        variant="destructive"
        disabled={isPending || checkedIds.length === 0}
      >
        <Trash2 className="size-4" />
        Delete
      </Button>
      <Link to="/admin/posts/new" className={cn(buttonVariants(), "ml-auto")}>
        Add new
        <PlusCircle className="size-4" />
      </Link>
    </div>
  );
};

export default TableActionButtons;
