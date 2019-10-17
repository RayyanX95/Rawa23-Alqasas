import React from 'react';

import classes from './Logo.module.css'

export default function Logo() {
    return (
        <a href="/">
            <div className={classes.Logo} >
                <span style={{ fontSize: '1.9em'}}><i className="fas fa-quran"></i></span>
            </div>
        </a>
    )
}
