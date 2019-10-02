import React, { Component } from 'react';
import { connect } from 'react-redux'

import classes from './Navigation.module.css';
import Logo from './Logo/Logo';
import NaveItems from './NavItems/NaveItems';

class Navigation extends Component {
    render() {
        if (this.props.renderAdmin && !this.props.authAdmin) {
            return null;
        }
        return (
            <div className={classes.Container} >
                <NaveItems authAdmin={this.props.authAdmin} />
                <Logo />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        renderAdmin: state.auth.renderAdmin,
        authAdmin: state.auth.authAdminSuccess
    }
}

export default connect(mapStateToProps)(Navigation);

