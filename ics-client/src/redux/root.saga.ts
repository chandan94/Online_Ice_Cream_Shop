import { all, call } from 'redux-saga/effects';
import icreamSaga from "./icream/icream.sagas";

export default function* rootSaga() {
    yield all([
        call(icreamSaga),
    ]);
}