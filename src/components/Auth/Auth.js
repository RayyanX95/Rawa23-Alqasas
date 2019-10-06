import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import Spinner from '../../components/UI/Spinner/Spinner';
import { authAdmin, auth } from '../../store/actions/index';
import classes from './Auth.module.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementConfig: {
                    type: 'email',
                    placeholder: 'ادخل بريدك الاكتروني'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                signInField: true,
            },
            password: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'ادخل الرقم السري'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                signInField: true
            },
            rePassword: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'أعد ادخال الرقم السري'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    equalTo: "password"
                },
                valid: false,
                touched: false,
                signInField: false,
                signupField: true,
            }
        },
        isSignup: true
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = () => {
        const controls = this.state.controls;
        if (this.props.admin) {
            this.props.onAuthAdmin(controls.email.value, controls.password.value);
        } else {
            this.props.onAuth(controls.email.value, controls.password.value, this.state.isSignup)
        }
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    render() {
        const formElementsArray = [];
        const controls = this.state.controls;
        for (let key in controls) {
            if (this.props.admin && controls[key].signInField) {
                formElementsArray.push({
                    id: key,
                    config: controls[key]
                });
            }
            if ((!this.props.admin) && (controls[key].signInField || (controls[key].signupField && this.state.isSignup))) {
                console.log("ss ", (!this.props.admin && controls[key].signInField));
                formElementsArray.push({
                    id: key,
                    config: controls[key]
                });
            }
        }

        let headerTitle = <h3>{this.state.isSignup ? "انشاء حساب جديد" : "تسجيل دخول"}</h3>
        let switchHandler = (
            <p
                className={classes.ParClick}
                onClick={this.switchAuthModeHandler}
            >{!this.state.isSignup ? "ليس لديك حساب؟ أنشأ حساب جديد" : "لديك بالفعل حساب؟ سجل دخولك"}</p>
        )
        if (this.props.admin) {
            switchHandler = null;
            headerTitle = <h3>(أدمن)تسجيل دخول</h3>
        }

        let form = formElementsArray.map(formElement => (
            <input
                className="form-control"
                onChange={(event) => this.inputChangedHandler(event, formElement.id)}
                type={formElement.config.elementConfig.type}
                key={formElement.id}
                placeholder={formElement.config.elementConfig.placeholder}
                value={formElement.config.value} />
        ));

        let errorMsg = null;
        if (this.props.loading) {
            form = <Spinner />
        }
        else if (this.props.error) {
            errorMsg = <p className={classes.RedPar} >{this.props.error.message}</p>
        }

        if (this.props.isAuthenticated || this.props.authAdmin) {
            return <Redirect to="/" />
        }


        return (
            <div className={classes.Auth}>
                {headerTitle}
                {errorMsg}
                <form>
                    {form}
                    <button
                        className="btn btn-outline-success"
                        onClick={this.submitHandler}
                    >{!this.state.isSignup || this.props.admin ? "تسجيل الدخول" : "تسجل البيانات"}</button>
                </form>
                {switchHandler}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuthenticated: state.auth.token,
        authAdmin: state.auth.authAdminSuccess,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthAdmin: (email, password) => dispatch(authAdmin(email, password)),
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);