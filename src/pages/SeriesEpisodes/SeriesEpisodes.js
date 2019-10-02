import React from 'react';

import YouTubeVideoPlayer from '../../components/Video/YouTubeVideoPlayer';
import classes from './SeriesEpisodes.module.css';


const SeriesEpisodes = () => {
  return (
    <div className={classes.Container} >
      <div className={classes.VideoContainer} > 
          <YouTubeVideoPlayer
          videoID="GRXzodoFsN4"
          height={540} />
      </div>
      <div className={classes.List} >

      </div>
      
    </div>
  )
}

export default SeriesEpisodes
