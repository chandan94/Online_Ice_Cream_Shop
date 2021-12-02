import { Item } from "../../components/menu-item/menu-item.types";
import { GetAllICreamPayload } from "../../redux/icream/icream.types";
import { ToastState } from "../../redux/toast/toast.types";

export interface AddEditModalProps {
    showModal?: boolean,
    getAllICream: (payload: GetAllICreamPayload) => void,
    modalTitle: string,
    modalButton: string,
    currIcream: Item | null,
    isEdit: boolean,
    activePage: number,
    closeModal?: (show: boolean) => void,
    editCleanUp?: () => void,
    showToast: (payload: ToastState) => void,
};

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
}