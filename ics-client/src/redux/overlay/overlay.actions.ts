import { overlayActions } from "./overlay.types";

export const setOverlayLoading = (loading : boolean) => ({
    type: overlayActions.SET_LOADING,
    payload: loading,
});