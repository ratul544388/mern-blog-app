import { Edit, MoreVertical, Trash2 } from "lucide-react";
import Image from "../../../../components/image";
import DropdownMenu from "../../../../components/ui/dropdown-menu";
import { cn, formatDate } from "../../../../lib/utils";
import useConfirmModal from "../../../../hooks/user-confirm-modal";
import useMutate from "../../../../hooks/use-mutate";
import CommentForm from "./comment-form";
import { useState } from "react";

const CommentBox = ({ comment }) => {
  const { user, content, createdAt } = comment;
  const [isEditing, setIsEditing] = useState(false);
  const { ConfirmationDialog, confirm } = useConfirmModal({
    title: "Delete comment",
    description: "Are you sure you want to delete the comment?",
  });
  const { isPending, mutateAsync } = useMutate();

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      mutateAsync({
        api: `/api/comments/${comment._id}`,
        method: "delete",
        queryKey: "comments",
        successMessage: "Comment deleted",
      });
    }
  };

  const dropdownMenuTrigger = {
    children: <MoreVertical className="size-4" />,
  };

  const dropdownMenuItems = [
    {
      label: "Edit Comment",
      icon: Edit,
      onClick: () => setIsEditing(true),
    },
    {
      label: "Delete Comment",
      icon: Trash2,
      onClick: handleDelete,
      destructive: true,
    },
  ];

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {!isEditing && (
        <>
          <ConfirmationDialog />
          <div className="flex gap-3 relative">
            <Image
              src={user.image}
              alt={user.username}
              className="size-9 rounded-full"
            />
            <p className="font-medium">{user.username}</p>
            <p className="ml-auto mr-12 text-sm text-muted-foreground">
              {formatDate({ date: createdAt, type: "distance" })}
            </p>
            <DropdownMenu
              className="absolute right-0 -top-1.5"
              trigger={dropdownMenuTrigger}
              items={dropdownMenuItems}
              disabled={isPending}
            />
          </div>
          <p className="pl-12" dangerouslySetInnerHTML={{ __html: content }} />
        </>
      )}
      {isEditing && (
        <>
          <span
            onClick={handleCancelEditing}
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[200]"
          />
          <CommentForm
            comment={comment}
            className={cn("relative", isEditing && "z-[9999] p-5 rounded-md")}
            closeEditing={handleCancelEditing}
          />
        </>
      )}
    </div>
  );
};

export default CommentBox;
