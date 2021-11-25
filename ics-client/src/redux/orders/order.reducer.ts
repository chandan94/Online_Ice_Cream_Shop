import { OrderState, orderActions } from "./order.types";

const INITIAL_STATE : OrderState = {
    orders : [],
    isFetching: false,
    error: null,
}

const ordersReducer = (state: OrderState = INITIAL_STATE, action: any) : OrderState => {
    switch(action.type) {
        case orderActions.FETCH_ORDERS_START:
            return {
                ...state,
                isFetching: true,
            };
        case orderActions.FETCH_ORDERS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload,
            };
        case orderActions.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                orders: action.payload,
            }
        default: return state;
    }
};

export default ordersReducer;