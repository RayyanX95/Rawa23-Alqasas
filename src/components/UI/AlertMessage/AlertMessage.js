import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

import Backdrop from '../Backdrop/Backdrop';
import classes from './AlertMessage.module.css'

export default class AlertMessage extends Component {
    state = {
        show: true
    }

    dismissAlertMsgHandler = () => {
        this.setState({})
    }
    render() {
        const show = this.props.success || this.props.failed;

        let variant = 'info';
        let alertHeading = 'Great bud!'
        let alertMsg = 'Movie uploaded Successfully 😃'
        if (this.props.failed) {
            variant = 'danger';
            alertHeading = 'Sorry bud!'
            alertMsg = 'Movie was NOT uploaded successfully 😞'
        }
        if (show) {
            return (
                <div className={classes.Container}>
                    <Backdrop
                        show={show} />
                    <div className={classes.AlertMsg} >
                        <Alert variant={variant} onClose={this.props.close} dismissible>
                            <Alert.Heading>{alertHeading}</Alert.Heading>
                            <p>{alertMsg}</p>
                            <button onClick={this.props.close} className='btn btn-secondary' >Close</button>
                        </Alert>
                    </div>
                </div>
            );
        }
        return null;
    }
}