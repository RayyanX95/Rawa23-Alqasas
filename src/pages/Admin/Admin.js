import React, { Component } from 'react';
import { connect } from 'react-redux';

import Add from '../../components/Add/Add';
import Categories from '../../components/Categories/Categories';
import {
    addSeries,
    resetRequestsStates,
    addEpisode,
    selectSeries,
    authRenderAdmin
} from '../../store/actions/index';
import getDateTime from '../../utilities/getDate';
import Auth from '../../components/Auth/Auth';
import AlertMessage from '../../components/UI/AlertMessage/AlertMessage';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';


/**
 * Edit Alert MSG...
 */
class Admin extends Component {
    state = {
        showModal: false,
        askDelete: false,
        showEpisodeForm: false,
    }

    showModalHandler = () => {

        this.setState({ showModal: true })
    }
    closeModalHandler = () => {
        this.setState({ showModal: false })
    }

    showAddEpisodeHandler = (seriesName) => {
        console.log("showEpisodeForm: ", seriesName);

        this.setState({ showEpisodeForm: true });
        this.props.onSelectSeries(seriesName);
    }
    addEpisodeHandler = (episodeFormInfo) => {
        const episodeInfo = {};
        for (let key in episodeFormInfo) {
            episodeInfo[key] = episodeFormInfo[key].val;
        }
        this.props.onAddEpisode(this.props.seriesName, episodeInfo);
        this.closeModalHandler();
    }

    closeAddEpisodeHandler = () => {
        this.setState({ showEpisodeForm: false });
    }

    addSeriesHandler = (seriesFormInfo) => {
        this.closeModalHandler();

        const seriesInfo = {};
        for (let key in seriesFormInfo) {
            seriesInfo[key] = seriesFormInfo[key].val
        }
        seriesInfo["englishName"] = seriesInfo.englishName.replace(/\s+/g, '-');
        seriesInfo["episodesURL"] = "https://et3alem-w-etrafah.firebaseio.com/" + seriesInfo.englishName + ".json"
        const getDate = getDateTime();
        console.log('seriesInfo["episodesURL"]: ', seriesInfo["episodesURL"]);
        seriesInfo['uploadedAt'] = getDate;

        this.props.onAddSeries(seriesInfo, this.props.token)
    }

    askAddConfirmationHandler = () => {
        this.showModalHandler();
    }
    askDeleteConfirmationHandler = () => {
        this.setState({ askDelete: true, showModal: true });
    }


    closeAlertMsgHandler = () => {
        this.props.onResetUploadState();
    }

    componentDidMount = () => {
        this.props.onRenderAdmin();
    }
    /**
     * add admin sign in +++
     * make navigation to null til admin sign in +++
     * add use login
     */
    render() {
        if (!(this.props.authAdmin && this.props.token)) {
            return (
                <Auth admin={true} />
            )
        }

        if (this.props.loading) {
            return <Spinner />
        }
        let alertMsg = null;
        if (this.props.uploaded || this.props.wrongUpload) {
            return (
                <AlertMessage
                    success={this.props.uploaded}
                    failed={this.props.wrongUpload}
                    close={this.closeAlertMsgHandler} />
            )
        }

        if (this.state.showEpisodeForm) {
            return (
                <React.Fragment>
                    <Add
                        showEpisodeForm={true}
                        closeAddEpisode={this.closeAddEpisodeHandler}
                        showModal={this.state.showModal}
                        closeModal={this.closeModalHandler}
                        askAdd={this.askAddConfirmationHandler}
                        addEpisode={this.addEpisodeHandler} />
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                {alertMsg}
                <Add
                    showModal={this.state.showModal}
                    closeModal={this.closeModalHandler}
                    askAdd={this.askAddConfirmationHandler}
                    addSeries={this.addSeriesHandler} />

                <Categories
                    showEpisodeForm={this.showAddEpisodeHandler}
                    success={this.props.uploaded}
                    admin={true} />
            </React.Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        seriesName: state.series.selectedSeries,
        uploaded: state.series.uploadedSuccessfully,
        wrongUpload: state.series.wrongUpload,
        authAdmin: state.auth.authAdminSuccess,
        token: state.auth.token,
        loading: state.ui.loading
    }
}

const mapDispatchToPops = dispatch => {
    return {
        onAddSeries: (seriesInfo, token) => dispatch(addSeries(seriesInfo, token)),
        onResetUploadState: () => dispatch(resetRequestsStates()),
        onAddEpisode: (seriesName, episodeInfo) => dispatch(addEpisode(seriesName, episodeInfo)),
        onSelectSeries: (seriesName) => dispatch(selectSeries(seriesName)),
        onRenderAdmin: () => dispatch(authRenderAdmin()),
    }
}

export default connect(mapStateToProps, mapDispatchToPops)(Admin);
