import { Item } from "../../components/menu-item/menu-item.types";

export interface AddEditModalProps {
    showModal?: boolean,
    getAllICream: (search: string) => void,
    closeModal?: (show: boolean) => void,
    editCleanUp?: () => void,
    modalTitle: string,
    modalButton: string,
    currIcream: Item | null,
    isEdit: boolean,
};

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
}