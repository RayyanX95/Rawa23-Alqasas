import React from 'react';
import IosClose from 'react-ionicons/lib/IosClose';

import classes from './Form.module.css'


const Form = (props) => {
    let closeBtn = null;
    let title = "اضف مسلسل جديد";
    let btnTitle = "أضف المسلسل"
    if (props.close) {
        title = props.seriesName;
        btnTitle = "أضف الحلقة"
        closeBtn = (
            <IosClose
                className={classes.X}
                onClick={props.closeAddEpisode}
                fontSize="60px" color="#a52a2a"
                // shake={true}
            />
        )
    }
    return (
        <form className={classes.Form}>
            {closeBtn}
            <p className={classes.TitleP} >{title}</p>
            <p><strong style={{ color: 'red' }}> * </strong>يجب إدخال البيانات ذات العلامة</p>
            {
                props.formElementsArray.map((elem) =>
                    <div className="form-group" key={elem.id}>
                        <input
                            onChange={(e) => props.inputChangedHandler(e, elem.id)}
                            type="text"
                            className="form-control"
                            placeholder={elem.fieldsElements.placeholder}
                            value={elem.fieldsElements.val} />
                    </div>
                )
            }
            <button
                onClick={props.clicked}
                disabled={props.disabled}
            >{btnTitle}</button>
        </form>
    )
}

export default Form
