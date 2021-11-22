import { createSelector } from "reselect";
import RootState from "../store.type";

export const menuItemSelector = (state: RootState) => state.menu;

export const selectMenuItemEdit = createSelector(
    [menuItemSelector],
    (menu) => menu.editing,
);

export const selectMenuCurrItem = createSelector(
    [menuItemSelector],
    (menu) => menu.currItem,
)