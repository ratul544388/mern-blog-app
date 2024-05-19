import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../../../../validations/index";
import FormError from "../../components/form-error";
import Logo from "../../components/logo";
import useMutate from "../../hooks/use-mutate";
import { cn } from "../../lib/utils";
import { user } from "../../redux/user/user-slice";
import { Button, buttonVariants } from "../../components/ui/button";
import FormInput from "../../components/ui/form-input";

const Signup = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { isPending, mutateAsync } = useMutate();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const onSubmit = (values) => {
    mutateAsync({
      api: "/api/auth/signup",
      method: "post",
      data: values,
      onSuccess: (data) => {
        navigate("/");
        dispatch(user(data));
        reset();
      },
      onError: setError,
    });
  };

  return (
    <div className="mx-auto flex items-center mt-14 gap-16 max-w-[450px] lg:max-w-[1000px]">
      <div className="hidden flex-col items-center gap-3 lg:flex">
        <Logo className="text-5xl" />
        <h2 className="font-semibold text-center text-2xl text-muted-foreground">
          Sign up to Mern Blog App and post your first blog
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-6 bg-background border rounded-xl p-6 shadow-lg max-w-[450px]"
      >
        <FormInput
          error={errors.username?.message}
          {...register("username")}
          label="Username"
        />
        <FormInput
          error={errors.email?.message}
          {...register("email")}
          label="Email"
        />
        <FormInput
          error={errors.password?.message}
          {...register("password")}
          label="Password"
          type="password"
        />
        <FormInput
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          label="Confirm Password"
          type="password"
        />
        <FormError error={error} />
        <Button isLoading={isPending}>Sign up</Button>
        <div className="flex flex-col items-center text-sm">
          Already have an account?
          <Link
            to="/login"
            className={cn(buttonVariants({ variant: "link" }), "text-primary")}
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
