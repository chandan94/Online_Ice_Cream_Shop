import { Item } from "../../components/menu-item/menu-item.types";
import { GetAllICreamPayload } from "../../redux/icream/icream.types";

export interface AddEditModalProps {
    showModal?: boolean,
    getAllICream: (payload: GetAllICreamPayload) => void,
    closeModal?: (show: boolean) => void,
    editCleanUp?: () => void,
    modalTitle: string,
    modalButton: string,
    currIcream: Item | null,
    isEdit: boolean,
    activePage: number,
};

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
}