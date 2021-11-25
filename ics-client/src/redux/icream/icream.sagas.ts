import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import { setTotalPageCount } from '../pagination/pagination.action';
import { selectIsAdminUser } from '../user/user.selector';
import { fetchIcreamFailure, fetchIcreamSuccess } from './icream.action';
import { icreamActions } from "./icream.types";
import { axiosGetCall } from "./icream.util";

const ICREAM_URL = '/api/ice-cream';



export function* fetchIcreamCall({ payload } : any): Generator<any, any, any> {
    try {
        const pageCount = select(selectIsAdminUser) ? 5 : 6
        const icreamResp = yield axiosGetCall(ICREAM_URL, payload, pageCount);
        yield put(fetchIcreamSuccess(icreamResp.data));
        yield put(setTotalPageCount(icreamResp.count))
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