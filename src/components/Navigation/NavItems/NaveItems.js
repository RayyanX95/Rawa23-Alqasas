import React from 'react';
import { NavLink } from 'react-router-dom'

// import MdHome from 'react-ionicons/lib/MdHome';
import classes from './NaveItems.module.css';

const NaveItems = (props) => {
    let home = <span className={classes.Icon}><i className="fas fa-home"></i></span>
    let signIn = <span className={classes.Icon}><i className="fas fa-user-plus"></i></span>
    let signOut = <span className={classes.Icon}><i className="fas fa-sign-out-alt"></i></span>
    let admin = <span className={classes.Icon}><i className="fas fa-user-cog"></i></span>
    return (
        <ul className={classes.Ul} >
            {
                props.isAuth
                    ? <li>
                        <NavLink
                            className={classes.Nav}
                            to="/logout"
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#00bfff"
                            }}
                        >{signOut}</NavLink>
                    </li>
                    : null
            }
            {
                props.authAdmin
                    ? <li>
                        <NavLink
                            className={classes.Nav}
                            to="/admin"
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#00bfff"
                            }}
                        >{admin}</NavLink>
                    </li>
                    : null
            }
            {
                !props.isAuth
                    ? <li>
                        <NavLink
                            className={classes.Nav}
                            to="/register"
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#00bfff"
                            }}
                        >{signIn}</NavLink>
                    </li>
                    : null
            }
            <li>
                <NavLink
                    exact
                    className={classes.Nav}
                    to="/"
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#00bfff"
                    }} >{home}</NavLink>
            </li>
        </ul>
    )
}

export default NaveItems
