import { GetAllICreamPayload } from "../../redux/icream/icream.types";

export interface IPagingProps {
    total? : number,
    current? : number,
    active? : number,
    setActivePage?: (page: number) => void,
    getAllICream?: (payload: GetAllICreamPayload) => void,
    search?: string,
    isAdmin?: boolean,
}