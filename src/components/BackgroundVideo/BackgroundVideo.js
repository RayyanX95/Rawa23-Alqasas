import React from 'react';

import classes from './BackgroundVideo.module.css';
import videoSource from '../../assets/videoSource.mp4'

const BackgroundVideo = () => {
    return (
        <div className={classes.Container} >
            <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className={classes.Content}>
                <div className={classes.SubContent} >
                    <h1>تعلم و ترفه</h1>
                    <p>قصص دينية كارتونية للتعلم الترفه</p>
                    <button type="button" className="btn btn-outline-dark">تصفح كل القصص</button>
                </div>
            </div>
        </div>
    )
}

export default BackgroundVideo
