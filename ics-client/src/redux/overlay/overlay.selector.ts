import { createSelector } from "reselect";
import RootState from "../store.type";
import { OverlayState } from "./overlay.types";

export const selectSpinner = (state: RootState) => state.spinner;

export const isSpinnerLoading = createSelector(
    [selectSpinner],
    (spinner: OverlayState) => spinner.loading,
)