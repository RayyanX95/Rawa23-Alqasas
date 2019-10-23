import React from 'react';
import YouTube from 'react-youtube';

import classes from './YouTubeVideoPlayer.module.css'

class Video extends React.Component {

  _onReady(event) {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
  }
  _onEnd = () => {
    console.log("_____OnEnd______");

  }

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
      height: '230px',
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
          onReady={this._onReady}
          onEnd={this.props.onEnd}
        />
        <YouTube
          className={classes.YouTubeMobile}
          videoId={this.props.videoID}
          opts={optsMobile}
          onReady={this._onReady}
        />
      </React.Fragment>

    );
  }
}

export default Video