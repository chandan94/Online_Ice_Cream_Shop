import { ICreamState, icreamActions } from "./icream.types";

const INITIAL_STATE : ICreamState = {
    icreams : [],
    isFetching: false,
    error: null,
    search: '',
};

const icreamReducer = (state: ICreamState = INITIAL_STATE, action: any) : ICreamState => {
    switch(action.type) {
        case icreamActions.FETCH_ICREAM_START:
            return {
                ...state,
                isFetching: true,
                search: action.payload.search,
            };
        case icreamActions.FETCH_ICREAM_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload,
            };
        case icreamActions.FETCH_ICREAM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                icreams: action.payload,
            }
        default: return state;
    }
};

export default icreamReducer;