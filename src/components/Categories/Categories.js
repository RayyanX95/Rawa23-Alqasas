import React, { Component } from 'react';
import { connect } from 'react-redux';

import Category from './Category/Category';
import classes from './Categories.module.css';
import {
    getSeries,
    deleteSeries,
    resetRequestsStates
} from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../UI/Modal/Modal';
import Backdrop from '../UI/Backdrop/Backdrop';

class Categories extends Component {
    state = {
        show: false,
        series: '',
    }
    componentDidMount = () => {
        this.props.onGetSeries();
    }
    componentDidUpdate = () => {
        if (this.props.success) {
            this.props.onGetSeries();
        }
    }

    deleteSeriesHandler = (series) => {
        this.setState({ show: true, series: series });
    }
    closeModalHandler = () => {
        this.setState({ show: false })
    }
    confirmDeleteHandler = () => {
        this.props.onDeleteSeries(this.state.series.key, this.props.token);
        this.closeModalHandler();
    }

    render() {
        if (this.props.deleteSuccess || this.props.deleteFail) {
            return <Backdrop show={true} clicked={this.props.onResetUploadState} />
        }
        if (this.props.series)
            return (
                <div className={classes.Container + " container"} >
                    <div className="row justify-content-between" >
                        {
                            this.props.series.map(series => {
                                return <Category
                                    key={series.key}
                                    series={series}
                                    id={series.key}
                                    name={series.arabicName}
                                    link={series.englishName}
                                    imgURL={series.imgURL}
                                    description={series.description}
                                    episodeNo={series.episodeNo}
                                    showEpisodeForm={() => this.props.showEpisodeForm(series.englishName, series.key)}
                                    admin={this.props.admin}
                                    detailsHandler={this.func1}
                                    delete={() => this.deleteSeriesHandler(series)} />
                            })
                        }
                    </div>
                    <Modal show={this.state.show} >
                        <p className={classes.headTitle}>
                            هل تريد مسح مسلسل<span className={classes.SeriesName} >
                                {this.state.series.arabicName}
                            </span>
                        </p>

                        <p className={classes.Message} >يجب أن تعرف اذا مسحته لا تستطيع ارجاعه مرة اخري!!</p>
                        <div className={classes.Controls} >
                            <button
                                className="btn btn-outline-danger"
                                onClick={this.confirmDeleteHandler}
                            >نعم أريد</button>
                            <button
                                onClick={this.closeModalHandler}
                                className="btn btn-outline-dark"
                            >لا أريد</button>
                        </div>
                    </Modal>
                </div >
            )
        return <Spinner />;
    }
}

const mapsStateToProps = state => {
    return {
        series: state.series.series,
        token: state.auth.token,
        deleteSuccess: state.series.deleteSuccess,
        deleteFail: state.auth.deleteFail,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetSeries: () => dispatch(getSeries()),
        onDeleteSeries: (id, token) => dispatch(deleteSeries(id, token)),
        onResetUploadState: () => dispatch(resetRequestsStates()),
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(Categories);
