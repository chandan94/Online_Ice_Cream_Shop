export interface AddEditModalProps {
    showModal?: boolean,
    closeModal?: (show: boolean) => {},
    modalTitle: string,
};

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
}