import React from 'react';
import { NavLink } from 'react-router-dom'

import classes from './NaveItems.module.css'

const NaveItems = (props) => {
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
                        >تسجيل الخروج</NavLink>
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
                        > أدمن</NavLink>
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
                        > تسجيل</NavLink>
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
                    }} > الرئيسية</NavLink>
            </li>
        </ul>
    )
}

export default NaveItems
