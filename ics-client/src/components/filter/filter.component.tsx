import { Dispatch } from "redux";
import { Form } from "react-bootstrap";
import { createStructuredSelector } from "reselect";
import { connect } from 'react-redux';

import { fetchIcreamStart } from "../../redux/icream/icream.action";
import { GetAllICreamPayload } from "../../redux/icream/icream.types";
import { selectICreamFilter, selectICreamSearch } from "../../redux/icream/icream.selector";
import { selectActivePage } from "../../redux/pagination/pagination.selector";

import './filter.styles.scss';


const Filter = ({ search, page, getAllICream, filter }: any) => {

    const handleDropdownSelect = (e : any) => {
        const value = e.target.value;;
        getAllICream({
            search,
            page,
            filter: value,
        });
    }
    return (
        <Form.Select aria-label="Default select example" className="filter" onChange={handleDropdownSelect}>
            <option value="">All</option>
            <option value="chocolate">Chocolate</option>
            <option value="strawberry">Strawberry</option>
            <option value="pista">Pista</option>
            <option value="vanilla">Vanilla</option>
        </Form.Select>
    );
}

const mapStateToProps = createStructuredSelector({
    search: selectICreamSearch,
    page: selectActivePage,
    filter: selectICreamFilter
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllICream: (payload: GetAllICreamPayload) => dispatch(fetchIcreamStart(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Filter);