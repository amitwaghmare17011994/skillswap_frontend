import { toast } from "react-toastify";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 1000,
  });
};
export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 1000,
  });
};
