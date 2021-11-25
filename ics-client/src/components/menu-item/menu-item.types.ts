export interface Item {
    _id?: string,
    name: string,
    desc?: string,
    img: string,
    cost?: number,
    calorie?: number,
    ingredients?: string,
    size?: string,
    flavor?: string,
    orderAmount?: number,
    delete?: boolean
    imageName?: string,
}

export interface MenuItemProps {
    item: Item,
    isAdmin: boolean,
    isAddItem: boolean,
    showModal?: (show: boolean) => void,
    editBtnClicked?: (item: Item) => void,
    getAllICream?: (search: string,flavor:string) => void
}