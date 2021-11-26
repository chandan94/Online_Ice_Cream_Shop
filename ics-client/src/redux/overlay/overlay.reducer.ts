import { overlayActions, OverlayState } from "./overlay.types";

const INITIAL_STATE : OverlayState = {
    loading : false,
};

const overlayReducer = (state : OverlayState = INITIAL_STATE, action: any) : OverlayState => {
    switch(action.type) {
        case overlayActions.SET_LOADING:
        return {
            ...state,
            loading : action.payload,
        };
        default:
            return state;
    }
};

export default overlayReducer;
