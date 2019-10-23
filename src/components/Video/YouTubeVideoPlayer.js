import React from 'react';
import YouTube from 'react-youtube';

import classes from './YouTubeVideoPlayer.module.css'

class Video extends React.Component {
  render() {
    const opts = {
      height: this.props.height + 'px',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        iv_load_policy: 3,
        color: "white",
      }
    };
    const optsMobile = {
      height: '205px',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        iv_load_policy: 3,
        color: "white"
      }
    };
    return (
      <React.Fragment>
        <YouTube
          className={classes.YouTubeDesktop}
          videoId={this.props.videoID}
          opts={opts}
          onEnd={this.props.onEnd}
        />
        <YouTube
          className={classes.YouTubeMobile}
          videoId={this.props.videoID}
          opts={optsMobile}
          onEnd={this.props.onEnd}
        />
      </React.Fragment>

    );
  }
}

export default Video