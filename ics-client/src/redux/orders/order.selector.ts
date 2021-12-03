import { createSelector } from "reselect";
import RootState from "../store.type";

export const selectOrders = (state: RootState) => state.orderDetails;

export const selectAllOrders = createSelector (
    [selectOrders],
    (orderDetails) => orderDetails.orders,
);