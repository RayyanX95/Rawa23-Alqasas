import React, { Component } from 'react';
import { connect } from 'react-redux';

import YouTubeVideoPlayer from '../../components/Video/YouTubeVideoPlayer';
import classes from './SeriesDetails.module.css';
import ParseQueryParams from '../../utilities/ParseQueryParams';
import Spinner from '../../components/UI/Spinner/Spinner';
import { getEpisodes } from '../../store/actions/index';
import EpisodeItem from '../../components/EpisodeItem/EpisodeItem'


class SeriesDetails extends Component {
  state = {
    selectedSeries: null
  }

  componentDidMount = () => {
    const queryParams = ParseQueryParams(this.props.location.search)
    if (this.props.series) {
      let selectedSeries = null;
      selectedSeries = this.props.series.find(ser => ser.englishName === queryParams.name);
      this.setState({ selectedSeries: selectedSeries });
      this.props.onGetEpisodes(selectedSeries.englishName, selectedSeries.key);
    }
  }

  componentDidUpdate = () => {
    const queryParams = ParseQueryParams(this.props.location.search)
    if (!this.state.selectedSeries) {
      let selectedSeries = null;
      selectedSeries = this.props.series.find(ser => ser.englishName === queryParams.name);
      this.setState({ selectedSeries: selectedSeries })
      this.props.onGetEpisodes(selectedSeries.englishName, selectedSeries.key);
    }
  }

  /**
   * add title and some action under video player
   */
  render() {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
    let episodes_ = null
    if (this.props.episodes) {
      episodes_ = this.props.episodes;
      console.log(" this.props.episodes: ", episodes_);
    }
    if (this.state.selectedSeries) {
      return (
        <div className={classes.Container} >
          <div className={classes.VideoContainer} >
            <YouTubeVideoPlayer
              videoID={this.state.selectedSeries.startTrailer}
              height={540} />
          </div>
          <div className={classes.List} >
            {
              episodes_ ?
                episodes_.map(episode =>
                  <EpisodeItem
                    key={episode.videoId}
                    arabicName={ this.state.selectedSeries.arabicName}
                    englishName={this.state.selectedSeries.englishName}
                    episodeName={"الحلقة " + episode.order}
                    imgSrc={this.state.selectedSeries.imgURL} />
                )
                : <Spinner />
            }

          </div>
        </div>
      )
    }
    return <Spinner />
  }
}

const mapStateToProps = state => {
  return {
    series: state.series.series,
    episodes: state.series.episodes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetEpisodes: (seriesName, seriesId) => dispatch(getEpisodes(seriesName, seriesId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesDetails)
