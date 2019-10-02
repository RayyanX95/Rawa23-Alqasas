import React from 'react';

import classes from './Category.module.css'
import ImgHoverOverlay from '../../UI/ImgHoverOverlay/ImgHoverOverlay';

const Category = (props) => {
    let containerClass = [classes.CategoryContainer];
    if (props.preview) {
        containerClass = [classes.Preview]
    }

    return (
        <React.Fragment>
            <div
                className={containerClass}
                // onClickCapture={props.detailsHandler}
                 >
                <div className={classes.Category} >
                    <ImgHoverOverlay
                        add={props.showEpisodeForm}
                        admin={props.admin}
                        imgURL={props.imgURL}
                        name={props.name}
                        description={props.description}
                        delete={props.delete} />
                </div>
                <div className={classes.ParContainer} >
                    <p className={classes.ParBold} >{props.name}</p>
                    <p className={classes.ParNormal} >{props.episodeNo} عدد الحلقات</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Category
