import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      toast.success("User account successfuly updated");
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdatingUser, updateUser };
}
