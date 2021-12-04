import { ToastState } from "../../redux/toast/toast.types";

export interface SignUpProps
{
    showToast: (payload: ToastState) => void
};