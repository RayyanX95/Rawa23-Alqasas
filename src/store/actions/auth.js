import {
    AUTH_START,
    AUTH_ADMIN_SUCCESS,
    AUTH_ADMIN_FAIL,
    AUTH_RENDER_ADMIN,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT
} from './actionsTypes';

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authAdmin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const adminEmail = "ibrahim.alrayany@gmail.com";
        const adminPassword = "rayyan2018";
        const isAdminAuth = email === adminEmail && password === adminPassword;
        if (isAdminAuth) {
            dispatch(authAdminSuccess());
            const authData = {
                email: email,
                password: password,
                returnSecureToken: true
            }
            fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMXGsTsDRsAAGfKvC5ytj2qJDa7g22GeU", {
                method: "POST",
                body: JSON.stringify(authData)
            })
                .then(res => res.json())
                .then(parsedRed => {
                    console.log("res: ", parsedRed);

                    dispatch(authSuccess(parsedRed.idToken))
                })
                .catch(err => {
                    dispatch(authFail(err.message));
                    console.log(err);
                })
        } else {
            dispatch(authAdminFail());
        }
    }
}


export const authAdminSuccess = () => {
    return {
        type: AUTH_ADMIN_SUCCESS
    }
}
export const authAdminFail = () => {
    return {
        type: AUTH_ADMIN_FAIL
    }
}
export const authRenderAdmin = () => {
    return {
        type: AUTH_RENDER_ADMIN
    }
}
export const authSuccess = (token) => {
    return {
        type: AUTH_SUCCESS,
        token: token
    }
}
export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        let URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMXGsTsDRsAAGfKvC5ytj2qJDa7g22GeU"
        if (isSignup) {
            URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMXGsTsDRsAAGfKvC5ytj2qJDa7g22GeU"
        }

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        fetch(URL, {
            method: "POST",
            body: JSON.stringify(authData)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    throw (new Error());
                }
            })
            .then(parsedRed => {
                dispatch(authSuccess(parsedRed.idToken));
            })
            .catch(err => {
                dispatch(authFail(err.response));
                console.log(err);
                console.log("NO_INTERNET!!");
            })

    }
}

export const authLogout = () => {
    return {
        type: AUTH_LOGOUT,
    }
}