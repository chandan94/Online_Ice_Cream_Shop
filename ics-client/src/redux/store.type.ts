import { ModalState } from "./add-edit-modal/add.edit-modal.types";
import { ICreamState } from "./icream/icream.types";
import { MenuItemState } from "./menu-item/menu-item.types";
import { PaginationState } from "./pagination/pagination.types";
import { UserState } from "./user/user.types";

export interface RootState {
    user: UserState,
    modal: ModalState,
    icream: ICreamState,
    menu: MenuItemState,
    page: PaginationState,
}

export default RootState;