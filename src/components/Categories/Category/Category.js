import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import classes from './Category.module.css'
import ImgHoverOverlay from '../../UI/ImgHoverOverlay/ImgHoverOverlay';

class Category extends Component {

    clickDetailsHandler = () => {
        this.props.history.push({
            pathname: '/details',
            search: `?id=${this.props.id}&name=${this.props.link}`,
            state: this.props.series
        })
    }
    render() {
        let containerClass = [classes.CategoryContainer];
        if (this.props.preview) {
            containerClass = [classes.Preview]
        }
        return (
            <React.Fragment>
                <div className={containerClass}
                    onClickCapture={this.clickDetailsHandler}>
                    <div className={classes.Category} >
                        <ImgHoverOverlay
                            add={this.props.showEpisodeForm}
                            admin={this.props.admin}
                            imgURL={this.props.imgURL}
                            name={this.props.name}
                            description={this.props.description}
                            delete={this.props.delete} />
                    </div>
                    <div className={classes.ParContainer} >
                        <p className={classes.ParBold} >{this.props.name}</p>
                        <p className={classes.ParNormal} >{this.props.episodeNo} عدد الحلقات</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Category)
