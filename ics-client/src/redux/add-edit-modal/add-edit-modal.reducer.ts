import { modalActions, ModalState } from "./add.edit-modal.types";

const INITIAL_STATE : ModalState = {
    show: false,
}

const modalReducer = (state : ModalState = INITIAL_STATE, action: any ) : ModalState => {
    switch(action.type) {
        case modalActions.SET_MODAL_SHOW:
            return {
                ...state,
                show: action.payload,
            };
        default:
            return state;
    }
};

export default modalReducer;