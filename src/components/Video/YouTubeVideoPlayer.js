import React from 'react';
import YouTube from 'react-youtube';

class Video extends React.Component {

  _onReady(event) {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
  }

  render() {
    const opts = {
      height: this.props.height + 'px',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
      <YouTube
        videoId={this.props.videoID}
        opts={opts}
        onReady={this._onReady}
      />
    );
  }
}

export default Video