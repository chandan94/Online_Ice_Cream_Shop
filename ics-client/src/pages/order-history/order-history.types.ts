import { Order } from "../../redux/orders/order.types";

export interface OrderProps {
    order? : Order,
    userId? : any,
    getAllOrders? : (userId: any) => void,
}