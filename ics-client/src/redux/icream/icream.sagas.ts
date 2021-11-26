import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import { setTotalPageCount } from '../pagination/pagination.action';
import { selectIsAdminUser } from '../user/user.selector';
import { fetchIcreamFailure, fetchIcreamSuccess } from './icream.action';
import { icreamActions } from "./icream.types";
import { axiosGetCall } from "../axios.util";
import { setOverlayLoading } from '../overlay/overlay.actions';

const ICREAM_URL = '/api/ice-cream';



export function* fetchIcreamCall({ payload } : any): Generator<any, any, any> {
    try {
        yield put(setOverlayLoading(true));
        const isAdmin = yield select(selectIsAdminUser);
        const pageCount = isAdmin ? 5 : 6
        const icreamResp = yield axiosGetCall(ICREAM_URL, payload, pageCount);
        yield put(fetchIcreamSuccess(icreamResp.data));
        yield put(setTotalPageCount(icreamResp.count))
    } catch (error : any) {
        yield put(fetchIcreamFailure(error));
    } finally {
        yield put(setOverlayLoading(false));
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