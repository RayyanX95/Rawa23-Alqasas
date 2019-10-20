import {
    UPLOADED_SUCCESSFULLY,
    WRONG_UPLOAD,
    RESET_REQUEST_STATES,
    GET_SERIES,
    SELECT_SERIES,
    DELETE_SUCCESS,
    DELETE_FAIL,
    SET_EPISODES
} from '../actions/actionsTypes';

const initialState = {
    series: null,
    episodes: null,
    selectedSeries: null,
    selectedSeriesEpisodes: null,
    uploadedSuccessfully: false,
    wrongUpload: false,

    deleteSuccess: false,
    deleteFail: false
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case UPLOADED_SUCCESSFULLY:
            return {
                ...state,
                uploadedSuccessfully: true
            };
        case WRONG_UPLOAD:
            return {
                ...state,
                wrongUpload: true
            };
        case RESET_REQUEST_STATES:
            return {
                ...state,
                wrongUpload: false,
                uploadedSuccessfully: false,
                deleteSuccess: false,
                deleteFail: false
            };
        case GET_SERIES:
            return {
                ...state,
                series: actions.series,
            };
        case SELECT_SERIES:
            return {
                ...state,
                selectedSeries: actions.selectedSeries,
            };
        case DELETE_SUCCESS:
            return {
                ...state,
                deleteSuccess: true,
                deleteFail: false
            };
        case DELETE_FAIL:
            return {
                ...state,
                deleteFail: true,
                deleteSuccess: false
            };
        case SET_EPISODES:
            return {
                ...state,
                episodes: actions.episodes
            };
        default:
            return state;
    }

}

export default reducer;