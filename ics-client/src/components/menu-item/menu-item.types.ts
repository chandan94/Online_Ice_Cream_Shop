export interface Item {
    name: string,
    desc: string,
    img: string,
    quantity: number,
    calorie?: number,
    ingredients?: string,
    size?: string,
    flavor?: string,
}

export interface MenuItemProps {
    item: Item,
    isAdmin: boolean,
    isAddItem: boolean,
    showModal?: (show: boolean) => {},
}