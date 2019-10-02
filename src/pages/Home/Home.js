import React, { Component } from 'react';
import { connect } from 'react-redux';

import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo';
import Categories from '../../components/Categories/Categories';
import { getSeries } from '../../store/actions/index';

class Home extends Component {

    render() {

        return (
            <React.Fragment>
                <BackgroundVideo />
                <Categories />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        series: state.series.series
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadSeries: () => dispatch(getSeries()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
