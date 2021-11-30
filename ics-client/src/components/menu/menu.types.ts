import { ICream } from "../../redux/icream/icream.types";
import { Item } from "../menu-item/menu-item.types";

export interface MenuProps {
    isAdmin: boolean,
    icreams: ICream[],
    editClicked: boolean,
    currIcream: Item | null,
    filter: string,
    isFetching: boolean,
}