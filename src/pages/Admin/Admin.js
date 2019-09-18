import React, { Component } from 'react';
import { connect } from 'react-redux'

import Add from '../../components/Add/Add';
import Categories from '../../components/Categories/Categories';
import Modal from '../../components/UI/Modal/Modal';
import { addSeries, resetUploadState } from '../../store/actions/index';
import getDateTime from '../../utilities/getDate';
import AlertMessage from '../../components/UI/AlertMessage/AlertMessage';

class Admin extends Component {
    state = {
        isShowModal: false,
        isAskDelete: false,
        addFormToModal: false
    }

    showModalHandler = () => {

        this.setState({ isShowModal: true })
    }
    closeModalHandler = () => {
        this.setState({ isShowModal: false })
    }

    askAddSeriesConfirmationHandler = () => {
        this.showModalHandler();
    }
    addSeriesHandler = (seriesFormInfo) => {
        this.closeModalHandler();

        const seriesInfo = {};
        for (let key in seriesFormInfo) {
            seriesInfo[key] = seriesFormInfo[key].val
        }
        seriesInfo["episodesURL"] = "https://et3alem-w-etrafah.firebaseio.com/" + seriesInfo.englishName + ".json"
        const getDate = getDateTime();
        console.log('seriesInfo["episodesURL"]: ', seriesInfo["episodesURL"]);
        seriesInfo['uploadedAt'] = getDate;

        this.props.onAddSeries(seriesInfo)
    }

    askAddEpisodeConfirmationHandler = () => {
        this.showModalHandler();
    }
    askDeleteConfirmationHandler = () => {
        this.setState({ isAskDelete: true, showModal: true });
    }

    closeAlertMsgHandler = () => {
        this.props.onResetUploadState();
    }

    render() {
        return (
            <React.Fragment>
                <Add
                    isShowModal={this.state.isShowModal}
                    closeModal={this.closeModalHandler}
                    askAddSeries={this.askAddSeriesConfirmationHandler}
                    addSeries={this.addSeriesHandler} />

                <Categories
                    addEpisode={this.addEpisodeHandler}
                    admin={true} />

                <AlertMessage
                    success={this.props.uploaded}
                    failed={this.props.wrongUpload}
                    close={this.closeAlertMsgHandler} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedSeries: state.series.selectedSeries,
        uploaded: state.series.uploadedSuccessfully,
        wrongUpload: state.series.wrongUpload
    }
}

const mapDispatchToPops = dispatch => {
    return {
        onAddSeries: (seriesInfo) => dispatch(addSeries(seriesInfo)),
        onResetUploadState: () => dispatch(resetUploadState())
    }
}

export default connect(mapStateToProps, mapDispatchToPops)(Admin);
