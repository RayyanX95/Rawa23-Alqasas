import React from 'react';

import classes from './BackgroundVideo.module.css';
import videoSource from '../../assets/videoSource.mp4'

const BackgroundVideo = () => {
    let height = 550;
    if (window.innerWidth > 1050)
        height = 710
    console.log("window.innerWidth: ", window.innerWidth);

    return (
        <div className={classes.Container} >
            <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className={classes.Content}>
                <div className={classes.SubContent} >
                    <h1>روائع القصص</h1>
                    <p>مقتطفات من أفضل ما ورد في قصص الانبياء والصالحين</p>
                    <button
                        className="btn btn-outline-dark"
                        onClick={() => window.scroll({
                            top: height,
                            left: 0,
                            behavior: 'smooth'
                        })}
                    >تصفح كل القصص</button>
                </div>
            </div>
        </div>
    )
}

export default BackgroundVideo
