import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import Spinner from '../../components/UI/Spinner/Spinner';
import { authAdmin } from '../../store/actions/index';
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
                touched: false
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
                touched: false
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
        if (this.props.admin) {
            this.props.onAuthAdmin(this.state.controls.email.value, this.state.controls.password.value);
        } else {

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
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let headerTitle = <h3>{!this.state.isSignup ? "انشاء حساب جديد" : "تسجيل دخول"}</h3>
        let switchHandler = (
            <p
                className={classes.ParClick}
                onClick={this.switchAuthModeHandler}
            >{!this.state.isSignup ? "ليس لديك حساب؟ أنشأ حساب جديد" : "لديك بالفعل حساب؟ سجل دخولك"}</p>
        )
        if (this.props.admin) {
            switchHandler = null;
            headerTitle = <h3>(Admin)تسجيل دخول</h3>
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

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMsg = null;
        if (this.props.error) {
            errorMsg = <p className={classes.RedPar} >{this.props.error.message}</p>
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
                    >سجل بياناتك</button>
                </form>
                {switchHandler}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // loading: state.auth.loading,
        // isAuthenticated: state.auth.token,
        authAdmin: state.auth.authAdminSuccess,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthAdmin: (email, password) => dispatch(authAdmin(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);