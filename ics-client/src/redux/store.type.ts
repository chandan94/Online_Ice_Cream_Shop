import { ModalState } from "./add-edit-modal/add.edit-modal.types";
import { ICreamState } from "./icream/icream.types";
import { MenuItemState } from "./menu-item/menu-item.types";
import { OrderState } from "./orders/order.types";
import { OverlayState } from "./overlay/overlay.types";
import { PaginationState } from "./pagination/pagination.types";
import { ToastState } from "./toast/toast.types";
import { UserState } from "./user/user.types";

export interface RootState {
    user: UserState,
    modal: ModalState,
    icream: ICreamState,
    menu: MenuItemState,
    page: PaginationState,
    orderDetails: OrderState,
    spinner: OverlayState,
    toast: ToastState,
}

export default RootState;