import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default function useToast() {
  const defaultToastOptions = {
    position: "bottom-left",
    autoClose: 5000,
    closeButton: true,
    pauseOnFocusLoss: false,
    dangerouslyHTMLString: false,
  };

  const showInfoToast = (message) => {
    return toast.info(message, defaultToastOptions);
  };

  const updateToast = (toastId, message, type = "info") => {
    toast.update(toastId, {
      render: message,
      type,
      ...defaultToastOptions,
    });
  };

  const showSuccessToast = (message) => {
    toast.success(message, defaultToastOptions);
  };

  const showErrorToast = (message) => {
    toast.error(message, defaultToastOptions);
  };

  return {
    showInfoToast,
    updateToast,
    showSuccessToast,
    showErrorToast,
  };
}
