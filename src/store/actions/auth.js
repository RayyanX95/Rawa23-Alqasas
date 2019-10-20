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

export const authCheckTimeout = (expirationDate) => {
    return dispatch => {
        dispatch(setTimeout(() => {
            dispatch(authLogout())
        }, expirationDate * 1000))
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
            .then(parsedRes => {
                const expirationDate = new Date(new Date().getTime() + parsedRes.expiresIn * 1000);
                console.log("expirationDate: ", expirationDate);
                localStorage.setItem('token', parsedRes.idToken);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userId", parsedRes.localId);
                dispatch(authSuccess(parsedRes.idToken));
                // dispatch(authCheckTimeout(parsedRes.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response));
                console.log(err);
                console.log("NO_INTERNET!!");
            })

    }
}

export const authLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: AUTH_LOGOUT,
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token));
                authCheckTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
            } else {
                dispatch(authLogout())
            }
        }
    }
}