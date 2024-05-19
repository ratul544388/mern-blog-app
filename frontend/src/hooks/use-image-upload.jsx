import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ImagePlus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";

const useImageUpload = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(value);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { mutateAsync: uploadImageMutation, isPending } = useMutation({
    mutationFn: async (e) => {
      setUploadProgress(0);
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      const url = `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`;

      const { data } = await axios.post(url, formData, {
        onUploadProgress: ({ total, loaded }) => {
          if (total) {
            setUploadProgress((loaded / total) * 100);
          }
        },
      });

      return data;
    },
    onSuccess: (data) => {
      onChange(data.secure_url);
    },
    onError: () => {
      window.alert("Something went wrong");
    },
  });

  const ImageUploader = ({ className, error, label }) => {
    return (
      <div>
        <div
          onClick={() => {
            if (previewImage) return;
            inputRef.current.click();
          }}
          role={!value && "button"}
          className={cn(
            "relative overflow-hidden group size-32 border rounded-md flex items-center justify-center",
            error && "border-none ring-[1.5px] ring-red-500",
            isPending && "pointer-events-none",
            className
          )}
        >
          <input
            ref={inputRef}
            id="file"
            type="file"
            accept="image/*"
            onChange={uploadImageMutation}
            className="absolute pointer-events-none opacity-0"
          />
          {!value && (
            <div className="flex flex-col items-center">
              <div className="p-2 rounded-full bg-accent/40 group-hover:bg-accent transition-colors">
                <ImagePlus className="size-6" />
              </div>
              <span
                className={cn(
                  "select-none text-sm text-center text-muted-foreground",
                  (isPending || previewImage) && "hidden"
                )}
              >
                {label}
              </span>
            </div>
          )}
          {value && (
            <Button
              onClick={() => {
                setPreviewImage(undefined);
                onChange(undefined);
              }}
              type="button"
              variant="outline"
              size="icon"
              className="absolute top-0 right-0 text-red-500 hover:text-red-600 rounded-full size-8"
            >
              <Trash2 className="size-4" />
            </Button>
          )}
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview Image"
              className={cn(
                "absolute h-full w-full -z-10 object-cover",
                isPending && "opacity-50"
              )}
            />
          )}
          <CircularProgressbar
            value={uploadProgress}
            className={cn(
              "abs_center size-10 pointer-events-none",
              (!uploadProgress || uploadProgress === 100) && "hidden"
            )}
            strokeWidth={12}
            styles={buildStyles({
              pathColor: "hsl(var(--primary))",
            })}
          />
        </div>
        <span className="text-red-500 text-sm">{error}</span>
      </div>
    );
  };

  return { ImageUploader, isUploadingImage: isPending };
};

export default useImageUpload;
