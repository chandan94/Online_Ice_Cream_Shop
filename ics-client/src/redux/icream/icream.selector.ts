import { createSelector } from "reselect";
import rootState from "../store.type";
import { ICreamState } from "./icream.types";

export const selectIcream = (state: rootState) => state.icream;

export const selectAllICream = createSelector (
    [selectIcream],
    (icream: ICreamState) => icream.icreams,
);

export const selectAllICreamSearch = createSelector (
    [selectIcream],
    (icream: ICreamState) => icream.search,
);