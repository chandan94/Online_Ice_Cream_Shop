import { ICream, icreamActions } from "./icream.types";

export const fetchIcreamStart = () => ({
    type: icreamActions.FETCH_ICREAM_START,
});

export const fetchIcreamSuccess = (icream: ICream[]) => ({
    type: icreamActions.FETCH_ICREAM_SUCCESS,
    payload: icream
});

export const fetchIcreamFailure = (err: Error) => ({
    type: icreamActions.FETCH_ICREAM_FAILURE,
    payload: err
})