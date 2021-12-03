import { Order, orderActions } from "./order.types";

export const fetchOrdersStart = (userId :any ) => ({
    type: orderActions.FETCH_ORDERS_START,
    payload :userId
});

export const fetchOrderSuccess = (orders: Order[]) => ({
    type: orderActions.FETCH_ORDERS_SUCCESS,
    payload: orders
});

export const fetchOrdersFailure = (err: Error) => ({
    type: orderActions.FETCH_ORDERS_FAILURE,
    payload: err
});