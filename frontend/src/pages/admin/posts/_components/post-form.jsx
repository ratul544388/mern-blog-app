import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postSchema } from "../../../../../../validations";
import useMutate from "../../../../hooks/use-mutate";
import { generateSlug } from "../../../../lib/utils";
import { Button } from "../../../../components/ui/button";
import { categories } from "../../../../../constants";
import Select from "../../../../components/ui/select";
import FormInput from "../../../../components/ui/form-input";
import RichTextEditor from "../../../../components/ui/rich-text-editor";
import useImageUpload from "../../../../hooks/use-image-upload";

const PostForm = ({ post, title, api, method, buttonLabel }) => {
  const { isPending, mutateAsync } = useMutate();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      ...(post
        ? {
            image: post.image,
            title: post.title,
            slug: post.slug,
            category: post.category,
            description: post.description,
          }
        : {}),
    },
  });

  const { ImageUploader, isUploadingImage } = useImageUpload({
    value: getValues("image"),
    onChange: (value) => setValue("image", value),
  });

  console.log(getValues("description"))

  const onSubmit = (values) => {
    mutateAsync({
      api,
      method,
      data: values,
      onSuccess: () => {
        reset();
        navigate("/admin/posts");
      },
    });
  };

  const getError = (field) => {
    return errors?.[field]?.message;
  };

  return (
    <div className="border rounded-lg shadow-md w-full max-w-[450px] mt-10">
      <h1 className="text-2xl font-semibold px-5 pt-4">{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
        <div className="flex flex-col gap-6 p-5 pt-7">
          <ImageUploader
            label="Upload an Image"
            error={getError("image")}
            className="w-full"
          />
          <FormInput
            label="Title"
            {...register("title", {
              onChange: (e) => setValue("slug", generateSlug(e.target.value)),
            })}
            error={getError("title")}
            disabled={isPending}
          />
          <FormInput
            label="Slug"
            {...register("slug", {
              onChange: (e) => setValue("slug", generateSlug(e.target.value)),
            })}
            disabled={isPending}
            error={getError("slug")}
          />
          <Select
            label="Category"
            value={getValues("category")}
            onChange={(value) =>
              setValue("category", value, { shouldValidate: true })
            }
            disabled={isPending}
            options={categories}
            error={getError("category")}
          />
          <RichTextEditor
            value={getValues("description")}
            onChange={(value) => setValue("description", value)}
            disabled={isPending}
            error={getError("description")}
          />
        </div>
        <div className="px-5 pt-3 pb-5 bg-background sticky bottom-0 rounded-b-lg">
          <Button
            isLoading={isPending}
            disabled={isUploadingImage}
            className="w-full"
          >
            {buttonLabel}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
