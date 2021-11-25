import { fetchIcreamStart } from "./icream.action";


export const getAllICreamCall = (searchValue: string, activePage: number, filterVal: string) => {
        fetchIcreamStart({
            search: searchValue,
            page: activePage && activePage > 1 ? activePage : 0,
            filter: filterVal,
        });
};
