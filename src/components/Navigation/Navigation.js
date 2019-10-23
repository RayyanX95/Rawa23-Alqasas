import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import classes from './Navigation.module.css';
import Logo from './Logo/Logo';
import NaveItems from './NavItems/NaveItems';

class Navigation extends Component {
    state = {
        isStared: false
    }
    onStaredHandler = () => {
        alert("clicked!")
        this.setState({ isStared: !this.state.isStared })
    }
    render() {
        const pathnameCheck = this.props.history.location.pathname === "/details";
        const widthCheck = window.innerWidth < 444;
        
        if ((this.props.renderAdmin && !this.props.authAdmin) || (pathnameCheck && widthCheck)) {
            return null;
        }
        return (
            <div className={classes.Container} >
                <NaveItems
                    authAdmin={this.props.authAdmin}
                    isAuth={this.props.isAuth}
                    isStared={this.state.isStared}
                    staredHandler={this.onStaredHandler} />
                <Logo />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        renderAdmin: state.auth.renderAdmin,
        authAdmin: state.auth.authAdminSuccess && state.auth.token,
        isAuth: state.auth.token
    }
}

export default withRouter(connect(mapStateToProps)(Navigation));

