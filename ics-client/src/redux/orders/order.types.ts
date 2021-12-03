export const orderActions = {
    FETCH_ORDERS_START: 'FETCH_ORDERS_START',
    FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
    FETCH_ORDERS_FAILURE: 'FETCH_ORDERS_FAILURE',
}

export interface OrderItems {
    _id: string,
    name: string,
    cost: number,
    img: string,
    quantity: number,
}

export interface OrderState {
    orders: Order[],
    isFetching: boolean,
    error: Error | null,
}

export interface OrderGetRepsonse {
    data: Order[],
}

export interface Order {
    _id?: string,
    userId?: string,
    date?: string,
    items?: OrderItems[],
    getAllOrders :any

}
