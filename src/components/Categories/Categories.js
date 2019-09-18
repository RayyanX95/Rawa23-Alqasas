import React, { Component } from 'react';

import Category from './Category/Category';
import classes from './Categories.module.css'

export default class Categories extends Component {
    state = {
        categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    }

    render() {
        return (
            <div className={classes.Container + " container"} >
                <div className="row justify-content-between" >
                    {
                        this.state.categories.map((category, i) => <Category key={i}
                            add={this.props.add}
                            admin={this.props.admin} />)
                    }
                </div>
            </div>
        )
    }
}
