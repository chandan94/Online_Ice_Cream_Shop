import { GetAllICreamPayload } from "../../redux/icream/icream.types";

export interface HeaderProps {
    getAllICream?: (paylaod : GetAllICreamPayload) => void,
    getAllOrders ?: any,
    activePage: number,
    filter: string,
    itemCount :number,
    currUser ?: string,
    isAdmin ?: boolean,

}