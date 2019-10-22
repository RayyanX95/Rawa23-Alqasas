import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import YouTubeVideoPlayer from '../../components/Video/YouTubeVideoPlayer';
import classes from './SeriesDetails.module.css';
import ParseQueryParams from '../../utilities/ParseQueryParams';
import Spinner from '../../components/UI/Spinner/Spinner';
import { getEpisodes } from '../../store/actions/index';
import EpisodeItem from '../../components/EpisodeItem/EpisodeItem'


class SeriesDetails extends Component {
  state = {
    selectedSeries: null,
    selectedEpisode: null,
    trailer: "Dummy",
    queryParams: null

  }

  setVideoIdHandler = (episode) => {
    this.setState({ selectedEpisode: episode });
    this.props.history.push({
      search: `?series=${this.state.selectedSeries.key}&&ep=${episode.videoId}`,
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
        selectedEpisode: null,
      });
      this.props.onGetEpisodes(selectedSeries.englishName, selectedSeries.key);
      document.title = selectedSeries.arabicName;
    }

    if (this.props.episodes && this.state.trailer && queryParams.ep) {
      const selectedEpisode = this.props.episodes.find(ep => ep.videoId === queryParams.ep);
      this.setState({ selectedEpisode: selectedEpisode, trailer: null });
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

    if (this.state.selectedSeries && this.state.selectedEpisode) {
      return (
        <div className={classes.Container} >
          <div className={classes.VideoContainer} >
            <div className={classes.Video} >
              <YouTubeVideoPlayer
                videoID={this.state.trailer ? this.state.trailer : this.state.selectedEpisode.videoId}
                height={540} />
            </div>
            <div className={classes.TitleContainer} >
                <p className={classes.EpisodeTitle} >{this.state.selectedEpisode.order + " الحلقة"}</p>
                <p className={classes.SeriesTitle} >{this.state.selectedSeries.englishName + " | " + this.state.selectedSeries.arabicName}</p>
                <span className={classes.SeriesInfo} >{" عدد الحلقات " + this.state.selectedSeries.episodeNo}</span>
                <span className={classes.SeriesInfo} >{" • " + this.state.selectedSeries.productionYear}</span>
            </div>
          </div>
          <div className={classes.List} >
            {
              this.props.episodes ?
                this.props.episodes.map(episode =>
                  <Link style={{ textDecoration: "none" }}
                    key={episode.videoId}
                    to={`/details?series=${this.state.selectedSeries.key}&&ep=${episode.videoId}`}>
                    <EpisodeItem
                      clicked={() => this.setVideoIdHandler(episode)}
                      key={episode.videoId}
                      arabicName={this.state.selectedSeries.arabicName}
                      englishName={this.state.selectedSeries.englishName}
                      episodeName={"الحلقة " + episode.order}
                      imgSrc={this.state.selectedSeries.imgURL}
                      playing={this.state.selectedEpisode.videoId === episode.videoId} />
                  </Link>
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
