import { UI_START_LOADING, UI_STOP_LOADING } from "../actions/actionsTypes"

const initialState = {
    loading: false
}

export default (state = initialState, actions) => {
    switch (actions.type) {

        case UI_START_LOADING:
            return {
                ...state,
                loading: true
            }

        case UI_STOP_LOADING:
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}
