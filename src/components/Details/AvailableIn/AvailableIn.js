import React from 'react'
import classes from './AvailableIn.module.css';

const AvailableIn = (props) => {
    return (
        <div className={classes.AvailableIn}>
            <i>Available in:</i>
            <a href={props.link_720} target="_blank" rel="noopener noreferrer"> 720p.BlueRay</a>
            <a href={props.link_1080} target="_blank" rel="noopener noreferrer"> 1080p.BlueRay</a>
        </div>
    )
}

export default AvailableIn
