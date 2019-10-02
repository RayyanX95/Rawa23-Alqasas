import React from 'react';

import MdCloseCircle from 'react-ionicons/lib/MdCloseCircle';
import MdAddCircle from 'react-ionicons/lib/MdAddCircle';
import classes from './ImgHoverOverlay.module.css';

const ImgHoverOverlay = (props) => {
    let deleteBtn = null;
    let addBtn = null;
    if (props.admin) {
        deleteBtn = (
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
    if(description.length > 50) {
        description = props.description.substring(0, 50) + "...";
    }
    return (
        <div className={classes.Container}>
            <img className={classes.Image} src={props.imgURL} alt="Avatar" />
            <div className={classes.Overlay} >
                <h5>{props.name}</h5>
                <p>{description}</p>
                <div className={classes.Add} >{addBtn}</div>
            </div>
            {deleteBtn}
        </div>
    )
}

export default ImgHoverOverlay
