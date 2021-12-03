export interface IceCreamDetailProps
{
    item : any,
    removeNavigateItem ? :any
}

export interface Item {
    _id?: string,
    name: string,
    desc?: string,
    img: string,
    cost: number,
    calorie: number,
    ingredients: string,
    size?: string,
    flavor: string,
    delete?: boolean
    imageName: string,
    inventory: number,
}