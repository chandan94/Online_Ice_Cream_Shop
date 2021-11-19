import { createSelector } from "reselect";
import { ModalState } from "./add.edit-modal.types";

export const selectModal = (state : any) => state.modal;

export const selectModalShow = createSelector(
    [selectModal],
    (modal: ModalState) => modal.show
);