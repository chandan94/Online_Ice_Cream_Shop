export interface Item {
    name: string,
    desc: string,
    img: string,
    quantity: number,
}

export interface MenuItemProps {
    item: Item,
    isAdmin: boolean,
    isAddItem: boolean,
    showModal?: (show: boolean) => {},
}