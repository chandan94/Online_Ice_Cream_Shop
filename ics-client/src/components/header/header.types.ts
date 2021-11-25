import { GetAllICreamPayload } from "../../redux/icream/icream.types";

export interface HeaderProps {
    getAllICream?: (paylaod : GetAllICreamPayload) => void,
    activePage: number,
}