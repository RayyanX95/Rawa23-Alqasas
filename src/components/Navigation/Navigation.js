import React, { Component } from 'react';
import { connect } from 'react-redux'

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
        if (this.props.renderAdmin && !this.props.authAdmin) {
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

export default connect(mapStateToProps)(Navigation);

