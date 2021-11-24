import { Item } from "../../components/menu-item/menu-item.types";
import { menuItemActions } from "./menu-item.types";

export const onItemEditClick  = (item: Item | null) => ({
    type: menuItemActions.EDIT_MENU_ITEM,
    payload: item,
});

export const editDone = () => ({
    type: menuItemActions.EDIT_DONE,
});
