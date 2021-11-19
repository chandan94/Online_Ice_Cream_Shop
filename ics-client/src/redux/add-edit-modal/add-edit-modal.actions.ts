import { modalActions } from "./add.edit-modal.types";

export const setModalShow = (show: boolean) => ({
    type: modalActions.SET_MODAL_SHOW,
    payload: show,
});