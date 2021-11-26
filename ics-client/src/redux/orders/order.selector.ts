import { createSelector } from "reselect";
import RootState from "../store.type";
import { OrderState } from "./order.types";

export const selectOrders = (state: RootState) => state.orderDetails;

export const selectAllOrders = createSelector (
    [selectOrders],
    (orderDetails: OrderState) => orderDetails.orders,
);