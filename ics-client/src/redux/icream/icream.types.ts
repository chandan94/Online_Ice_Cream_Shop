export const icreamActions = {
    FETCH_ICREAM_START: 'FETCH_ICREAM_START',
    FETCH_ICREAM_SUCCESS: 'FETCH_ICREAM_SUCCESS',
    FETCH_ICREAM_FAILURE: 'FETCH_ICREAM_FAILURE',
}

export interface ICream {
    _id: string,
    name: string,
    flavor: string,
    image: string,
    cost: number,
    calorie: number,
    ingredients: string,
    imageName: string,
    inventory: number,
}

export interface ICreamState {
    icreams: ICream[],
    isFetching: boolean,
    error: Error | null,
    search: string,
    filter: string,
}

export interface ICreamGetRepsonse {
    count : number,
    data: ICream[],
}

export interface GetAllICreamPayload {
    search: string,
    page: number,
    filter :string,
}