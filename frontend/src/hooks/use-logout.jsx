import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../redux/user/user-slice";
import useMutate from "./use-mutate";
import useConfirmModal from "./user-confirm-modal";
const useLogout = () => {
  const { ConfirmationDialog, confirm } = useConfirmModal({
    title: "Logout",
    description: "Are you sure? You can login anytime again.",
  });
  const { mutateAsync } = useMutate();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const ok = await confirm();
    if (ok) {
      mutateAsync({
        api: "/api/auth/logout",
        method: "post",
        onSuccess: () => {
          dispatch(user(null));
          navigate("/");
        },
      });
    }
  };

  const LogoutModal = () => {
    return <ConfirmationDialog />;
  };

  return { LogoutModal, handleLogout };
};

export default useLogout;
