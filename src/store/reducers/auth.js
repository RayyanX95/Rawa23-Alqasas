import {
    AUTH_START,
    AUTH_ADMIN_SUCCESS,
    AUTH_ADMIN_FAIL,
    AUTH_RENDER_ADMIN,
    AUTH_SUCCESS,
    AUTH_FAIL
} from '../actions/actionsTypes';

const initialState = {
    authAdminSuccess: false,
    token: null,
    error: null,
    loading: false,
    renderAdmin: false
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case AUTH_ADMIN_SUCCESS:
            return {
                ...state,
                authAdminSuccess: true,
            }
        case AUTH_ADMIN_FAIL:
            return {
                ...state,
                authAdminSuccess: false,
                loading: false,
                error: {
                    message: "من فضلك تأكد من البريد الاكتروني او الرقم السري"
                }
            }
        case AUTH_RENDER_ADMIN:
            return {
                ...state,
                renderAdmin: true
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                token: actions.token,
                error: null,
                loading: false
            }
        case AUTH_FAIL:
            return {
                ...state,
                token: null,
                error: {
                    message: "من فضلك تأكد من البريد الاكتروني او الرقم السري"
                },
                loading: false
            }

        default:
            return state
    }
}
