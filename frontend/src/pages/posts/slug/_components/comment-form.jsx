import { useState } from "react";
import RichTextEditor from "../../../../components/ui/rich-text-editor";
import useMutate from "../../../../hooks/use-mutate";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils";

const CommentForm = ({ postId, comment, className, closeEditing }) => {
  const [content, setContent] = useState(comment?.content);
  const { mutateAsync, isPending } = useMutate();

  const handleSubmit = (e) => {
    const method = comment ? "put" : "post";
    const api = comment
      ? `/api/comments/${comment._id}`
      : `/api/comments?postId=${postId}`;

    e.preventDefault();
    mutateAsync({
      api,
      method,
      data: {
        content,
      },
      queryKey: "comments",
      onSuccess: () => {
        setContent("");
        closeEditing();
      },
    });
  };

  const isDisabledSubmitButton =
    !content || content === "<p><br></p>" || isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-3 bg-background", className)}
    >
      <RichTextEditor
        disabled={isPending}
        value={content}
        onChange={setContent}
        placeholder="Write a comment"
        className="peer"
      />
      <div className="flex items-center justify-end gap-4">
        {closeEditing && (
          <Button variant="outline" onClick={closeEditing}>
            Cancel
          </Button>
        )}
        <Button
          className={cn(
            "hidden peer-focus-within:flex",
            (!isDisabledSubmitButton || comment) && "flex"
          )}
          disabled={isDisabledSubmitButton}
        >
          {comment ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
