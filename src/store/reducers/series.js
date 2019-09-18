import {
    ADD_SERIES,
    UPLOADED_SUCCESSFULLY,
    WRONG_UPLOAD,
    RESET_UPLOAD_STATE,
} from '../actions/actionsTypes';

const initialState = {
    selectedSeries: null,
    selectedSeriesEpisodes: null,
    uploadedSuccessfully: false,
    wrongUpload: false
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
        case RESET_UPLOAD_STATE:
            return {
                ...state,
                wrongUpload: false,
                uploadedSuccessfully: false
            };
        default:
            return state;
    }

}

export default reducer;