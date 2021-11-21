export const icreamActions = {
    FETCH_ICREAM_START: 'FETCH_ICREAM_START',
    FETCH_ICREAM_SUCCESS: 'FETCH_ICREAM_SUCCESS',
    FETCH_ICREAM_FAILURE: 'FETCH_ICREAM_FAILURE'
}

export interface ICream {
    name: string,
    flavor: string,
    image: string,
    quantity: number,
    calorie: number,
    ingredients: string,
}

export interface ICreamState {
    icreams: ICream[],
    isFetching: boolean,
    error: Error | null,
}