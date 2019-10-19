import React, { Component } from 'react';
import { connect } from 'react-redux';

import YouTubeVideoPlayer from '../../components/Video/YouTubeVideoPlayer';
import classes from './SeriesDetails.module.css';
import ParseQueryParams from '../../utilities/ParseQueryParams';
import Spinner from '../../components/UI/Spinner/Spinner'


class SeriesDetails extends Component {
  state = {
    queryParams: null
  }

  render() {
    const queryParams = ParseQueryParams(this.props.location.search)
    let selectedSeries = null
    if (this.props.series) {
      selectedSeries = this.props.series.find(ser => ser.key === queryParams.id);
      console.log("selectedSeries: ", selectedSeries);
      return (
        <div className={classes.Container} >
          <div className={classes.VideoContainer} >
            <YouTubeVideoPlayer
              videoID={selectedSeries.startTrailer}
              height={540} />
          </div>
          <div className={classes.List} >

          </div>
        </div>
      )
    }
    return <Spinner />
  }
}

const mapStateToProps = state => {
  return {
    series: state.series.series
  }
}

export default connect(mapStateToProps)(SeriesDetails)
