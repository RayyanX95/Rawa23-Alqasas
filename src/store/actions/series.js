import {
    ADD_SERIES,
    SELECT_SERIES,
    ADD_EPISODE,
    UPLOADED_SUCCESSFULLY,
    WRONG_UPLOAD,
    RESET_UPLOAD_STATE
} from './actionsTypes';

export const addSeries = (seriesInfo) => {
    return dispatch => {
        fetch("https://et3alem-w-etrafah.firebaseio.com/seriesInfo.json", {
            method: "POST",
            body: JSON.stringify(seriesInfo)
        })
            .then(res => res.json())
            .then(__ => {
                dispatch(uploadedSuccessfully());
            })
            .catch(err => {
                console.log(err);
                dispatch(wrongUpload());
            });
    }
}

export const uploadedSuccessfully = () => {
    return {
        type: UPLOADED_SUCCESSFULLY,
    }
}

export const wrongUpload = () => {
    return {
        type: WRONG_UPLOAD,
    }
}

export const resetUploadState = () => {
    return {
        type: RESET_UPLOAD_STATE
    }
}

export const addEpisode = (body, seriesName) => {
    return dispatch => {
        fetch("https://et3alem-w-etrafah.firebaseio.com/allEpisodes/" + seriesName + ".json", {
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(__ => {
                dispatch(uploadedSuccessfully());
            })
            .catch(err => {
                console.log(err);
                dispatch(wrongUpload());
            });
    }
}