import React from 'react';
import { NavLink } from 'react-router-dom'

import classes from './NaveItems.module.css'

const NaveItems = (props) => {
    return (
        <ul className={classes.Ul} >
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

            <li>
                <NavLink
                    className={classes.Nav}
                    to="/auth"
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#00bfff"
                    }}
                > تسجيل</NavLink>
            </li>

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
