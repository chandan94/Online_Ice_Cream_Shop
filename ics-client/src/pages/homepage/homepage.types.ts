import { GetAllICreamPayload } from "../../redux/icream/icream.types";

export interface HomepageProps {
    getAllIcream: (paylaod: GetAllICreamPayload) => {},
    activePage: number,
    loading: boolean,
}