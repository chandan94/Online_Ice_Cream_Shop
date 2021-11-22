import { Item } from "../../components/menu-item/menu-item.types";
import { menuItemActions } from "./menu-item.types";

export const onItemEditClick  = (item: Item) => ({
    type: menuItemActions.EDIT_MENU_ITEM,
    payload: item,
});