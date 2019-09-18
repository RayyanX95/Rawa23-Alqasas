import React from 'react';

import classes from './Navigation.module.css';
import Logo from './Logo/Logo';
import NaveItems from './NavItems/NaveItems';

export default function Navigation() {
    return (
        <div className={classes.Container} >
            <NaveItems>

            </NaveItems>
            <Logo />
        </div>
    )
}
