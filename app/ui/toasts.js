import { toast } from "sonner";
import colors from "tailwindcss/colors";

export const successToast = ({ text, label, actionButtonStyle }) => {
  toast.success(text, {
    action: {
      label: label || "אישור",
    },
    actionButtonStyle: actionButtonStyle || {
      color: "white",
      backgroundColor: colors.green[700],
    },
  });
};
export const errorToast = ({ text, label, actionButtonStyle }) => {
  toast.error(text, {
    action: {
      label: label || "אישור",
    },
    actionButtonStyle: actionButtonStyle || {
      color: "white",
      backgroundColor: colors.red[700],
    },
  });
};
export const infoToast = ({ text, label, actionButtonStyle }) => {
  toast.info(text, {
    action: {
      label: label || "אישור",
    },
    actionButtonStyle: actionButtonStyle || {
      color: "white",
      backgroundColor: colors.blue[700],
    },
  });
};
