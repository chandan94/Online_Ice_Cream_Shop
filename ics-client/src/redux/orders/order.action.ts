import { Order, orderActions } from "./order.types";

export const fetchOrdersStart = () => ({
    type: orderActions.FETCH_ORDERS_START,
});

export const fetchOrderSuccess = (orders: Order[]) => ({
    type: orderActions.FETCH_ORDERS_SUCCESS,
    payload: orders
});

export const fetchOrdersFailure = (err: Error) => ({
    type: orderActions.FETCH_ORDERS_FAILURE,
    payload: err
});