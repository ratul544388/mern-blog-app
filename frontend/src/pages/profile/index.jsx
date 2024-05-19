import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { updateProfileSchema } from "../../../../validations/index.js";
import FormError from "../../components/form-error.jsx";
import { Button } from "../../components/ui/button.jsx";
import FormInput from "../../components/ui/form-input.jsx";
import useImageUpload from "../../hooks/use-image-upload.jsx";
import useMutate from "../../hooks/use-mutate.js";
import useConfirmModal from "../../hooks/user-confirm-modal.jsx";
import { user } from "../../redux/user/user-slice.js";
const Profile = () => {
  const { user: currentUser } = useSelector(({ user }) => user);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { isPending, mutateAsync } = useMutate();
  const { ConfirmationDialog, confirm } = useConfirmModal({
    title: "Delete account",
    description:
      "Are you sure you want to delete your accout? This action cannot be undone",
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: currentUser.username,
      email: currentUser.email,
      image: currentUser.image,
    },
  });

  const { ImageUploader, isUploadingImage } = useImageUpload({
    value: getValues("image"),
    onChange: (value) => setValue("image", value),
  });

  const onSubmit = (values) => {
    const onSuccess = (data) => {
      dispatch(user(data));
      setError("");
      toast.success("Profile updated");
    };
    mutateAsync({
      api: `/api/users/update/${currentUser._id}`,
      method: "put",
      data: values,
      onSuccess,
      onError: setError,
    });
  };

  const onDeleteAccount = () => {
    mutateAsync({
      api: `/api/users/delete/${currentUser._id}`,
      method: "delete",
      onSuccess: () => dispatch(user(null)),
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center h-fit gap-6 p-6 rounded-lg sm:shadow-xl sm:border w-full max-w-[500px] mx-auto mt-12"
      >
        <ImageUploader label="Upload Profile Photo" />
        <FormInput
          label="Username"
          {...register("username")}
          error={errors?.username?.message}
          disabled={isPending}
        />
        <FormInput
          label="Email"
          value={currentUser.email}
          onChange={() => {}}
          disabled
        />
        <FormError error={error} />
        <div className="flex w-full items-center justify-between">
          <Button
            variant="ghost"
            type="button"
            onClick={async () => {
              const ok = await confirm();
              if (ok) {
                onDeleteAccount();
              }
            }}
            className="text-destructive"
          >
            Delete Account
          </Button>
          <Button
            // isLoading={isPending}
            disabled={isPending || isUploadingImage}
            className="ml-auto"
            size="lg"
          >
            Save
          </Button>
        </div>
      </form>
      <ConfirmationDialog />
    </>
  );
};

export default Profile;
