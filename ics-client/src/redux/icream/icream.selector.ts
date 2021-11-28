import { createSelector } from "reselect";
import rootState from "../store.type";
import { ICreamState } from "./icream.types";

export const selectIcream = (state: rootState) => state.icream;

export const selectAllICream = createSelector (
    [selectIcream],
    (icream: ICreamState) => icream.icreams,
);

export const selectICreamSearch = createSelector (
    [selectIcream],
    (icream: ICreamState) => icream.search,
);

export const selectICreamFilter = createSelector (
    [selectIcream],
    (icream: ICreamState) => icream.filter,
);

export const selectIsFetching = createSelector (
    [selectIcream],
    (icream: ICreamState) => icream.isFetching,
);