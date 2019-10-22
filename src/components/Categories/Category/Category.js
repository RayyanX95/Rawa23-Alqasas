import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Category.module.css'
import ImgHoverOverlay from '../../UI/ImgHoverOverlay/ImgHoverOverlay';

class Category extends Component {

    clickDetailsHandler = () => {
        // this.props.history.push({
        //     pathname: '/details',
        //     search: `?id=${this.props.id}&name=${this.props.link}`,
        //     state: this.props.series
        // })
        const videoId = null
        window.open(`/#/details?series=${this.props.id}`)
    }
    render() {
        let containerClass = [classes.CategoryContainer];
        if (this.props.preview) {
            containerClass = [classes.Preview]
        }
        return (
            <React.Fragment>
                <div className={containerClass}
                    onClick={this.clickDetailsHandler}>
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

            // <div className="p-5 border border-darken-4" onClick={() => alert("div clicked!")} >
            //     <button className="btn btn-outline-success" onClick={(e) => {e.stopPropagation();alert("Btn clicked!")}} >Click me!</button>
            // </div>
        )
    }
}

export default withRouter(Category)
