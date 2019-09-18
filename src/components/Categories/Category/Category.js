import React from 'react';

import classes from './Category.module.css'
import ImgHoverOverlay from '../../UI/ImgHoverOverlay/ImgHoverOverlay';

const Category = (props) => {
    let containerClass = [classes.CategoryContainer];
    if (props.preview) {
        containerClass = [classes.Preview]
    }
    return (
        <div className={containerClass} >
            <div className={classes.Category} >
                <ImgHoverOverlay
                    add={props.add}
                    admin={props.admin}
                    imgURL={props.imgURL}
                    name={props.arabicName}
                    description={props.description} />
            </div>
            <div className={classes.ParContainer} >
                <p className={classes.ParBold} >{props.arabicName}</p>
                <p className={classes.ParNormal} >{props.episodeNo}عدد الحلقات</p>
            </div>
        </div>
    )
}

export default Category
