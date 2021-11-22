import { Item } from "../../components/menu-item/menu-item.types";
// import { ICream } from "../icream/icream.types";

export const menuItemActions = {
    EDIT_MENU_ITEM : 'EDIT_MENU_ITEM',
    DELETE_MENU_ITEM: 'DELETE_MENU_ITEM',
}

export interface MenuItemState {
    editing: boolean,
    deleting: boolean,
    currItem: Item | null,
}