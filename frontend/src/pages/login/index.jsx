import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../../validations";
import FormError from "../../components/form-error";
import Logo from "../../components/logo";
import FormInput from "../../components/ui/form-input";
import useMutate from "../../hooks/use-mutate";
import { cn } from "../../lib/utils";
import { user } from "../../redux/user/user-slice";
import { Button, buttonVariants } from "../../components/ui/button";

const Login = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { isPending, mutateAsync } = useMutate();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (values) => {
    mutateAsync({
      api: `/api/auth/login`,
      method: "post",
      data: values,
      onSuccess: (data) => {
        console.log("success");
        dispatch(user(data));
        navigate("/");
      },
      onError: setError,
    });
  };

  const getError = (field) => {
    return errors[field]?.message;
  };

  return (
    <div className="flex items-center justify-center mt-14 gap-16 w-full mx-auto max-w-[500px] lg:max-w-[1000px]">
      <div className="hidden flex-col items-center gap-3 lg:flex">
        <Logo className="text-5xl" />
        <h2 className="font-semibold text-center text-2xl text-muted-foreground">
          Sign up to Mern Blog App and post your first blog
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full bg-background border rounded-xl p-6 shadow-lg max-w-[450px]"
      >
        <FormInput
          {...register("emailOrUsername")}
          name="emailOrUsername"
          error={getError("emailOrUsername")}
          label="Email or username"
          disabled={isPending}
        />
        <FormInput
          name="password"
          {...register("password")}
          label="Password"
          type="password"
          disabled={isPending}
          error={getError("password")}
        />
        <FormError error={error} />
        <Button isLoading={isPending}>Login</Button>
        <div className="flex flex-col text-muted-foreground items-center text-sm">
          Do not have an account?
          <Link
            to="/signup"
            className={cn(buttonVariants({ variant: "link" }), "text-primary")}
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
