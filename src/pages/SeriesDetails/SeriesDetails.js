import React, { Component } from 'react';
import { connect } from 'react-redux';

import YouTubeVideoPlayer from '../../components/Video/YouTubeVideoPlayer';
import classes from './SeriesDetails.module.css';
import ParseQueryParams from '../../utilities/ParseQueryParams';
import Spinner from '../../components/UI/Spinner/Spinner'


class SeriesDetails extends Component {
  state = {
    selectedSeries: null
  }

  componentDidMount = () => {
    const queryParams = ParseQueryParams(this.props.location.search)
    if (this.props.series) {
      let selectedSeries = null;
      selectedSeries = this.props.series.find(ser => ser.englishName === queryParams.name);
      this.setState({ selectedSeries: selectedSeries })
    }
  }

  componentDidUpdate = () => {
    const queryParams = ParseQueryParams(this.props.location.search)
    if (!this.state.selectedSeries) {
      let selectedSeries = null;
      selectedSeries = this.props.series.find(ser => ser.englishName === queryParams.name);
      this.setState({ selectedSeries: selectedSeries })
    }
  }

  render() {
    if (this.state.selectedSeries) {
      return (
        <div className={classes.Container} >
          <div className={classes.VideoContainer} >
            <YouTubeVideoPlayer
              videoID={this.state.selectedSeries.startTrailer}
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
