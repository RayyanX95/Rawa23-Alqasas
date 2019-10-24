import React from 'react';
import YouTube from 'react-youtube';

import classes from './YouTubeVideoPlayer.module.css'

class Video extends React.Component {
  state = {
    height: window.innerHeight,
    width: window.innerWidth
  }

  // componentDidMount = () => {
  //   // Additionally I could have just used an arrow function for the binding `this` to the component...
  //   window.addEventListener("resize", this.updateDimensions);
  // }

  // componentDidUpdate = () => {
  //   // Additionally I could have just used an arrow function for the binding `this` to the component...
  //   window.addEventListener("resize", this.updateDimensions);
  // }

  // updateDimensions = () => {
  //   this.setState({
  //     height: window.innerHeight,
  //     width: window.innerWidth
  //   });
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateDimensions);
  // }

  render() {
    let height = 210;
    if (this.state.width > 444) {
      height = 360;
    }
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
      height: height,
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
        <YouTube
          className={classes.YouTubeMobileWindow}
          videoId={this.props.videoID}
          opts={optsMobile}
          onEnd={this.props.onEnd}
        />
      </React.Fragment>

    );
  }
}

export default Video