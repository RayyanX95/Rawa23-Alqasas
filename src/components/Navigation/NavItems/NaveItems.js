import React from 'react';
import { NavLink } from 'react-router-dom'

import classes from './NaveItems.module.css'

const NaveItems = () => {
    return (
        <ul className={classes.Ul} >
            <li>
                <NavLink
                    className={classes.Nav}
                    to="/admin"
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#00bfff"
                    }} 
                    > أدمن</NavLink>
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
