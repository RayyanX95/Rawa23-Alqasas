import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import MdCloseCircle from 'react-ionicons/lib/MdCloseCircle';
import MdAddCircle from 'react-ionicons/lib/MdAddCircle';
import MdHeart from 'react-ionicons/lib/MdHeart';
import classes from './ImgHoverOverlay.module.css';

const ImgHoverOverlay = (props) => {
    let addBtn = null;
    let edgeIcon = null;

    if (props.admin) {
        edgeIcon = (
            <MdCloseCircle
                className={classes.X}
                onClick={props.delete}
                fontSize="25px" color="#cfcdcd" />
        )
        addBtn = (
            <MdAddCircle
                className={classes.AddBtn}
                onClick={props.add}
                fontSize="60px" color="#cfcdcd"
                beat={true} />
        )
    }
    let description = props.description;
    if (description.length > 50) {
        description = props.description.substring(0, 100) + "...";
    }
    return (
        <div className={classes.Container}>
            <img className={classes.Image} src={props.imgURL} alt="Avatar" />
            <div className={classes.Overlay} >
                <h5>{props.name}</h5>
                <p>{description}</p>
                <div className={classes.Add} >{addBtn}</div>
            </div>
            {edgeIcon}
        </div>
    )
}

export default withRouter(ImgHoverOverlay)
