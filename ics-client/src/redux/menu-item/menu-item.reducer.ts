import { menuItemActions, MenuItemState } from "./menu-item.types";

const INITIAL_STATE : MenuItemState = {
    editing: false,
    deleting: false,
    currItem: null,
};

const menuItemReducer = (state = INITIAL_STATE, action : any) => {
    switch (action.type) {
        case menuItemActions.EDIT_MENU_ITEM:
            return {
                ...state,
                editing: true,
                currItem: action.payload,
            }
        case menuItemActions.DELETE_MENU_ITEM:
            return {
                ...state,
                editing: action.payload,
            }
        default: return state;
    }
}

export default menuItemReducer;