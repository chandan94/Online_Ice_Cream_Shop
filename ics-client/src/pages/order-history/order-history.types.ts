import { Order } from "../../redux/orders/order.types";

export interface OrderProps {
    order : any,
    userId : any,
    getAllOrders : (userId: any) => void,
}