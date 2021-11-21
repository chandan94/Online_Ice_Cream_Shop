import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { fetchIcreamStart } from '../../redux/icream/icream.action';
import Menu from '../../components/menu/menu.component';
import './homepage.styles.scss';
import { HomepageProps } from './homepage.types';

class HomePage extends React.Component<HomepageProps> {

    componentDidMount() {
        const { getIcream } = this.props;
        getIcream();
    }

    render() {
        return (
            <div>
                <Menu />
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getIcream: () => dispatch(fetchIcreamStart()),
});

export default connect(null, mapDispatchToProps)(HomePage);