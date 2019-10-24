import React from 'react';
import YouTube from 'react-youtube';

import classes from './YouTubeVideoPlayer.module.css'

class Video extends React.Component {
  state = {
    height: window.innerHeight,
    width: window.innerWidth,
    initialTime: null,
    seekTo: 0,
  }

  // componentDidMount = () => {
  //   const seconds = new Date().getTime() / 1000;
  //   if (!this.state.initialTime) {
  //     this.setState({ initialTime: seconds })
  //   }
  //   // Additionally I could have just used an arrow function for the binding `this` to the component...
  //   window.addEventListener("resize", this.updateDimensions);

  // }

  // componentDidUpdate = () => {
  //   window.addEventListener("resize", this.updateDimensions);
  // }

  // updateDimensions = () => {
  //   const seconds = new Date().getTime() / 1000;
  //   this.setState(state => {
  //     return {
  //       ...state,
  //       height: window.innerHeight,
  //       width: window.innerWidth,
  //       seekTo: seconds - this.state.initialTime
  //     }
  //   })
  // }

  // componentWillUnmount() {
  //   console.log("Unmount__");
  //   window.removeEventListener("resize", this.updateDimensions);
  // }

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
      height: 380,
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        iv_load_policy: 3,
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