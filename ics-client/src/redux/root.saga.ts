import { all, call } from 'redux-saga/effects';
import icreamSaga from "./icream/icream.sagas";
import orderSaga from './orders/order.sagas';

export default function* rootSaga() {
    yield all([
        call(icreamSaga),
        call(orderSaga),
    ]);
}