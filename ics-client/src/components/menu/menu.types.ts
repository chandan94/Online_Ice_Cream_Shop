import { ICream } from "../../redux/icream/icream.types";

export interface MenuProps {
    isAdmin: boolean,
    icreams: ICream[]
}