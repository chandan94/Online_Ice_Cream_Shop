import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { fetchIcreamStart } from '../../redux/icream/icream.action';
import Menu from '../../components/menu/menu.component';
import './homepage.styles.scss';
import { HomepageProps } from './homepage.types';
import IPagination from '../../components/pagination/pagination.component';
import { createStructuredSelector } from 'reselect';
import { selectActivePage } from '../../redux/pagination/pagination.selector';
import { GetAllICreamPayload } from '../../redux/icream/icream.types';
import Filter from '../../components/filter/filter.component';

class HomePage extends React.Component<HomepageProps> {

    componentDidMount() {
        const { getAllIcream, activePage } = this.props;
        getAllIcream({
            search : "",
            page: activePage > 1 ? activePage : 0,
            filter: "",
        });
    }

    render() {
        return (
            <div>
                <Filter />
                <Menu />
                <IPagination />
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllIcream: (payload: GetAllICreamPayload) => dispatch(fetchIcreamStart(payload)),
});

const mapStateToProps = createStructuredSelector({
    activePage: selectActivePage,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);