import {
    UPLOADED_SUCCESSFULLY,
    WRONG_UPLOAD,
    RESET_REQUEST_STATES,
    GET_SERIES,
    SELECT_SERIES,
    DELETE_SUCCESS,
    DELETE_FAIL,
    SET_EPISODES
} from './actionsTypes';
import { uiStartLoading, uiStopLoading } from './index';

const ROOT_DB_URL = "https://et3alem-w-etrafah.firebaseio.com/";
const ALL_PLAYLIST_LOADED = false;

export const addSeries = (seriesInfo, token) => {
    return dispatch => {
        fetch(ROOT_DB_URL + 'seriesInfo.json?auth=' + token, {
            method: "POST",
            body: JSON.stringify(seriesInfo)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw (new Error());
                }
            })
            .then(__ => {
                dispatch(uploadedSuccessfully());
            })
            .catch(err => {
                console.log(err);
                dispatch(wrongUpload());
            });
    }
}

export const deleteSeries = (key, token) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch(ROOT_DB_URL + `seriesInfo/${key}.json?auth=` + token, {
            method: "DELETE",
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw (new Error());
                }
            })
            .then(___ => {
                dispatch(uiStopLoading());
                // dispatch(deleteSuccess());
            })
            .catch(err => {
                dispatch(uiStopLoading());
                dispatch(deleteFail());
                console.log(err);
            })
    }
}

export const deleteSuccess = () => {
    return {
        type: DELETE_SUCCESS
    }
}
export const deleteFail = () => {
    return {
        type: DELETE_FAIL
    }
}

export const uploadedSuccessfully = () => {
    console.log("__uploadedSuccessfully__");
    return {
        type: UPLOADED_SUCCESSFULLY,
    }
}

export const dispatchActions = (method) => {
    console.log("__dispatchActions__");
    return dispatch => {
        dispatch(method());
    }
}

export const wrongUpload = () => {
    return {
        type: WRONG_UPLOAD,
    }
}

export const resetRequestsStates = () => {
    return {
        type: RESET_REQUEST_STATES
    }
}

export const addEpisode = (seriesName, seriesId, episodeInfo, token) => {
    return dispatch => {
        let playlistID = episodeInfo.playlistID;
        let pageToken;
        apiCall(pageToken, playlistID, seriesName, seriesId, token);
    }
}

function getUrl(pageToken, playListID) {
    let pt = (typeof pageToken === "undefined") ? "" : `&pageToken=${pageToken}`,
        mykey = "AIzaSyCHxJbtL8laN9_wRbfpSRlvO-jG89nJWSc",
        URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playListID}&key=${mykey}${pt}`;

    return URL;
}

function apiCall(npt, playlistID, seriesName, seriesId, token) {
    fetch(getUrl(npt, playlistID))
        .then(res => {
            return res.json();
        })
        .then(parsedRes => {
            if (parsedRes.error) {
                console.log(parsedRes.error)
            } else {
                // it's a recursion
                let order = 0;
                let videosId = [];
                for (const item of parsedRes.items) {
                    videosId.push({
                        videoId: item.snippet.resourceId.videoId,
                        playListId: item.snippet.playlistId,
                        channelId: item.snippet.channelId,
                        channelTitle: item.snippet.channelTitle,
                        views: 0,
                        order: ++order,
                        seriesName: seriesName,
                        seriesId: seriesId
                    });
                }
                if (parsedRes.nextPageToken) {
                    return apiCall(parsedRes.nextPageToken, playlistID)
                }

                /*
                 * Posting the array of video IDs
                 */
                fetch(ROOT_DB_URL + "allEpisodes/" + seriesName + seriesId + "/playlist.json?auth=" + token, {
                    method: "POST",
                    body: JSON.stringify(videosId)
                })
                    .then(res => res.json())
                    .then(__ => {
                        uploadedSuccessfully();
                        alert("Episodes Uploaded Successfully!");
                    })
                    .catch(err => {
                        console.log(err);
                        wrongUpload();
                    });
            }
        })
        .catch(err => console.log(err))
}

export const getSeries = (token, userId) => {
    return dispatch => {
        // use it to get the saved series to a specific user (userId)
        // const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo"' + userId + '"'

        fetch(ROOT_DB_URL + "seriesInfo.json")
            .then(res => res.json())
            .then(parsedRes => {
                const seriesInfo = [];
                for (const key in parsedRes) {
                    seriesInfo.push({
                        ...parsedRes[key],
                        key: key
                    });
                };
                // console.log("seriesINfo_key: ", seriesInfo);
                dispatch(setSeries(seriesInfo));
            })
            .catch(err => {
                console.log(err);
                /**
                 * Add here a modal to indicate that no internet connection!
                 */
            });
    }
}

export const saveSeries = () => {
    return dispatch => {

    }
}
export const setSeries = (series) => {
    return {
        type: GET_SERIES,
        series: series
    }
}

export const selectSeries = (seriesName) => {
    return {
        type: SELECT_SERIES,
        selectedSeries: seriesName
    }
}

/**
 * get the episodes of a specific series
 */
export const getEpisodes = (seriesName, seriesId) => {
    return dispatch => {
        dispatch(uiStartLoading())
        fetch(ROOT_DB_URL + "allEpisodes/" + seriesName + seriesId + "/playlist.json")
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw (new Error());
                }
            })
            .then(parsedRes => {
                let key_ = null;
                for (const key in parsedRes) {
                    key_ = key;
                };
                console.log("key_: ", parsedRes[key_]);
                dispatch(setEpisodes(parsedRes[key_]))
                dispatch(uiStopLoading());
            })
            .catch(err => {
                console.log(err);
                dispatch(uiStopLoading());
            })
    }
}

export const setEpisodes = episodes => {
    return {
        type: SET_EPISODES,
        episodes: episodes
    }
}