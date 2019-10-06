import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { authLogout } from '../../../store/actions/index';
class Logout extends Component {

    componentDidMount = () => {
        this.props.onAuthLogout();
    }
    render() {
        return (
            <Redirect to="/" />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)