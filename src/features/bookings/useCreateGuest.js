import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createGuest as createGuestAPI } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate: createGuest, isLoading: isCreating } = useMutation({
    mutationFn: createGuestAPI,
    onSuccess: () => {
      toast.success("New guest successfuly created");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createGuest };
}
