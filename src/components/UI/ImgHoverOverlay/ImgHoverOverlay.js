import React from 'react';

import MdCloseCircle from 'react-ionicons/lib/MdCloseCircle';
import MdAddCircle from 'react-ionicons/lib/MdAddCircle';

import classes from './ImgHoverOverlay.module.css';
import imgURL from '../../../assets/img.jpg'

const ImgHoverOverlay = (props) => {
    let deleteBtn = null;
    let addBtn = null;
    if (props.admin) {
        deleteBtn = (
            <MdCloseCircle
                className={classes.X}
                onClick={() => alert('Hi!')}
                fontSize="25px" color="#69768a"
                // shake={true}
                 />
        )
        addBtn = (
            <MdAddCircle
                className={classes.AddBtn}
                onClick={props.add}
                fontSize="40px" color="#69768a"
                beat={true} />
        )
    }
    return (
        <div className={classes.Container}>
            <img className={classes.Image} src={props.imgURL} alt="Avatar" />
            <div className={classes.Overlay} >
                <h5>{props.name}</h5>
                <p>{props.description}</p>
                <div className={classes.Add} >{addBtn}</div>
            </div>
            {deleteBtn}
        </div>
    )
}

export default ImgHoverOverlay
