import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { cn } from "../../lib/utils";

const RichTextEditor = ({
  value,
  onChange,
  error,
  disabled,
  placeholder,
  className,
  editorClassName,
}) => {
  return (
    <div
      className={cn(
        "relative",
        disabled && "pointer-events-none opacity-60",
        className
      )}
    >
      <ReactQuill
        placeholder={placeholder}
        className={cn("peer", editorClassName)}
        theme="snow"
        value={value}
        onChange={onChange}
      />
      <span className="absolute pointer-events-none inset-0 border-2 h-[calc(100%_+_1px)] -translate-y-[1px] border-background" />
      <span
        className={cn(
          "absolute pointer-events-none inset-0 ring-[1.5px] ring-foreground/30 rounded-md peer-focus-within:ring-primary peer-focus-within:ring-[2.3px]",
          error && "ring-red-500 peer-focus-within:ring-red-500"
        )}
      />
    </div>
  );
};

export default RichTextEditor;
