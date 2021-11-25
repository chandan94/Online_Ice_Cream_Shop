import { Pagination } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectActivePage, selectTotalPage } from "../../redux/pagination/pagination.selector";
import { IPagingProps } from "./pagination.types";

import './pagination.styles.scss';
import { Dispatch } from "redux";
import { setActivePageNumber } from "../../redux/pagination/pagination.action";
import { GetAllICreamPayload } from "../../redux/icream/icream.types";
import { fetchIcreamStart } from "../../redux/icream/icream.action";
import { selectICreamSearch } from "../../redux/icream/icream.selector";
import { selectIsAdminUser } from "../../redux/user/user.selector";

const IPagination = ({active, total, setActivePage, getAllICream, search, isAdmin }: IPagingProps) => {

    const icreams = [];

    const handlePageClick = (e: any) => {
        const page = Number.parseInt(e.target.text, 10);
        if (setActivePage) {
            setActivePage(page);
        }

        if (getAllICream) {
            getAllICream({
                search : search && search.length > 0 ? search : "",
                page: page > 1 ? page : 0,
                filter: "",
            });
        }
    }

    const showCount = isAdmin ? 5 : 6

    const totalCount = total ? total : 0;

    const pageCount = (totalCount / showCount) + 1;

    if(total) {
        for (let num = 1; num <= pageCount  ; num++) {
            icreams.push(
                <Pagination.Item key={total + 1 + num} active={num === active} onClick={handlePageClick} >
                {num}
                </Pagination.Item>,
            );
        }
    }


    return (
        <div className="ice-paging">
            <Pagination size="lg">{icreams}</Pagination>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    total : selectTotalPage,
    active : selectActivePage,
    search : selectICreamSearch,
    isAdmin : selectIsAdminUser,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setActivePage: (page: number) => dispatch(setActivePageNumber(page)),
    getAllICream: (payload: GetAllICreamPayload) => dispatch(fetchIcreamStart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IPagination);