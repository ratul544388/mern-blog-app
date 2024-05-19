import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const useMutate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ api, method, data }) => {
      const response = await axios.request({
        url: api,
        method,
        data,
      });

      return response.data;
    },
    onSuccess: (data, props) => {
      const { queryKey, onSuccess, successMessage } = props;
      queryClient.invalidateQueries([queryKey]);
      if (successMessage) {
        toast.success(successMessage);
      }
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error, props) => {
      const { onError } = props;
      const errorMessage = error.response.data.error || "Something went wrong";
      if (onError) {
        return onError(errorMessage);
      }
      toast.error(errorMessage);
    },
  });

  return { mutateAsync, isPending };
};

export default useMutate;
