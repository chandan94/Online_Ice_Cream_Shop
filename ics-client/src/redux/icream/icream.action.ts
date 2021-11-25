import { ICream, icreamActions } from "./icream.types";

export const fetchIcreamStart = (search: string,filter :string) => ({
    type: icreamActions.FETCH_ICREAM_START,
    payload: search,
    payload1 : filter
});

export const fetchIcreamSuccess = (icream: ICream[]) => ({
    type: icreamActions.FETCH_ICREAM_SUCCESS,
    payload: icream
});

export const fetchIcreamFailure = (err: Error) => ({
    type: icreamActions.FETCH_ICREAM_FAILURE,
    payload: err
});