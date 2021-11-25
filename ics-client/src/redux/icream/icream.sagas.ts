import { takeLatest, put, all, call } from 'redux-saga/effects';
import { fetchIcreamFailure, fetchIcreamSuccess } from './icream.action';
import { icreamActions } from "./icream.types";
import { axiosGetCall } from "./icream.util";

const ICREAM_URL = '/api/ice-cream';

export function* fetchIcreamCall({ payload ,payload1} : any): Generator<any, any, any> {
    try {
        var request = {
            search : payload,
            filter :payload1
                };
        const icreamResp = yield axiosGetCall(ICREAM_URL, payload,payload1 );
        yield put(fetchIcreamSuccess(icreamResp));
    } catch (error : any) {
        yield put(fetchIcreamFailure(error));
    }

}
export function* fetchIcreamStartSaga() {
    yield takeLatest(icreamActions.FETCH_ICREAM_START, fetchIcreamCall);
}

export default function* icreamSaga() {
    yield all([
        call(fetchIcreamStartSaga),
    ])
}