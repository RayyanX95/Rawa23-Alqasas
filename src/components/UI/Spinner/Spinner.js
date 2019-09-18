import React from 'react';

import classes from './Spinner.module.css';

const spinner = () => (
    <div className={classes.Spinner}>
        <div className={classes.Loader}></div>
    </div>
);


export default spinner;