import { icreamActions, ICreamGetRepsonse, GetAllICreamPayload } from "./icream.types";

export const fetchIcreamStart = (getAllICreamPaylaod: GetAllICreamPayload) => ({
    type: icreamActions.FETCH_ICREAM_START,
    payload: getAllICreamPaylaod,
});

export const fetchIcreamSuccess = (icream: ICreamGetRepsonse) => ({
    type: icreamActions.FETCH_ICREAM_SUCCESS,
    payload: icream
});

export const fetchIcreamFailure = (err: Error) => ({
    type: icreamActions.FETCH_ICREAM_FAILURE,
    payload: err
});