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
    selectedSeries: null,
    trailer: "Dummy",
    episode: null,
    queryParams: null

  }

  setVideoIdHandler = (videoId) => {
    this.setState({ episode: videoId });
    this.props.history.push({
      search: `?series=${this.state.selectedSeries.key}&&ep=${videoId}`,
    })
  }

  hooksHandler = () => {
    const queryParams = ParseQueryParams(this.props.location.search)
    let selectedSeries = null;
    if (!this.state.selectedSeries && this.props.series) {
      selectedSeries = this.props.series.find(ser => ser.key === queryParams.series);
      this.setState({
        selectedSeries: selectedSeries,
        trailer: selectedSeries.startTrailer,
        episode: null,
      });
      this.props.onGetEpisodes(selectedSeries.englishName, selectedSeries.key);
      document.title = selectedSeries.arabicName;
    }

    if (this.props.episodes && this.state.trailer && queryParams.ep) {
      const selectedEpisode = this.props.episodes.find(ep => ep.videoId === queryParams.ep);
      this.setState({ episode: selectedEpisode.videoId, trailer: null });
    }
  }
  componentDidMount = () => {
    this.hooksHandler();
  }

  componentDidUpdate = () => {
    this.hooksHandler();
  }

  render() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    if (this.state.selectedSeries) {
      return (
        <div className={classes.Container} >
          <div className={classes.VideoContainer} >
            <YouTubeVideoPlayer
              videoID={this.state.trailer ? this.state.trailer : this.state.episode}
              height={540} />
          </div>
          <div className={classes.List} >
            {
              this.props.episodes ?
                this.props.episodes.map(episode =>
                  <EpisodeItem
                    clicked={() => this.setVideoIdHandler(episode.videoId)}
                    key={episode.videoId}
                    arabicName={this.state.selectedSeries.arabicName}
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
