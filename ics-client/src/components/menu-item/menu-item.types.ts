import { GetAllICreamPayload } from "../../redux/icream/icream.types";
import { ToastState } from "../../redux/toast/toast.types";

export interface Item {
    _id?: string,
    name: string,
    desc?: string,
    img: string,
    cost?: number,
    calorie?: number,
    ingredients?: string,
    size?: string,
    flavor?: string,
    orderAmount?: number,
    delete?: boolean
    imageName?: string,
    inventory?: number,
}

export interface MenuItemProps {
    item: Item,
    isAdmin: boolean,
    isAddItem: boolean,
    activePage?: number,
    showModal?: (show: boolean) => void,
    editBtnClicked?: (item: Item) => void,
    getAllICream?: (payload: GetAllICreamPayload) => void,
    addItemToCart?: (item: Item) => void,
    showToast?: (payload: ToastState) => void,
    addNavigateItemToCart?: (item: Item) => void,
}