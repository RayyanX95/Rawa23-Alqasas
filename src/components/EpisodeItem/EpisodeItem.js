import React from 'react';

import classes from './EpisodeItem.module.css';

const EpisodeItem = (props) => {
    const playing = props.playing;
    return (
        <div className={playing ? classes.Container + " " + classes.Playing : classes.Container}
            onClick={props.clicked} >
            <div className={classes.TitleContainer} >
                <p className={classes.EpisodeTitle} >{props.episodeName}</p>
            </div>
            <img className={classes.Img} src={props.imgSrc} alt="episodeThumb" />
        </div>
    )
}

export default EpisodeItem
