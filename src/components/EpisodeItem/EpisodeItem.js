import React from 'react';
import classes from './EpisodeItem.module.css'

const EpisodeItem = (props) => {
    return (
        <div className={classes.Container} >
            <div className={classes.TitleContainer} >
                <p className={classes.EpisodeTitle} >{props.episodeName}</p>
                <p className={classes.SeriesTitle} >{" | " + props.arabicName}</p>
                <p className={classes.SeriesTitle} >{props.englishName}</p>
            </div>
            <img className={classes.Img} src={props.imgSrc} alt="episodeThumb" />
        </div>
    )
}

export default EpisodeItem
