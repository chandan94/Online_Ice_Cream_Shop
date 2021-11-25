import { takeLatest, put, all, call } from 'redux-saga/effects';
// import { setTotalPageCount } from '../pagination/pagination.action';
import { fetchOrderSuccess, fetchOrdersFailure } from './order.action';
import { orderActions } from "./order.types";
import { axiosGetCall } from "../axios.util";

const ORDERS_URL = '/api/ice-cream';

export function* fetchOrdersCall({ payload } : any): Generator<any, any, any> {
    try {
        const icreamResp = yield axiosGetCall(ORDERS_URL, payload);
        yield put(fetchOrderSuccess(icreamResp.data));
    } catch (error : any) {
        yield put(fetchOrdersFailure(error));
    }

}
export function* fetchOrdersStartSaga() {
    yield takeLatest(orderActions.FETCH_ORDERS_START, fetchOrdersCall);
}

export default function* orderSaga() {
    yield all([
        call(fetchOrdersStartSaga),
    ])
}