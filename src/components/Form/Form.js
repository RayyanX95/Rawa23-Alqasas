import React from 'react';

import classes from './Form.module.css'


const Form = (props) => {
    return (
        <form className={classes.Form}>
            <p className={classes.TitleP} >أضف مسلسل جديد</p>
            <p><strong style={{ color: 'red' }}> * </strong>يجب إدخال البيانات ذات العلامة</p>
            {
                props.formElementsArray.map((elem) =>
                    <div className="form-group" key={elem.id}>
                        <input
                            onChange={(e) => props.inputChangedHandler(e, elem.id)}
                            type="text"
                            className={"form-control"}
                            placeholder={elem.fieldsElements.placeholder}
                        />
                    </div>
                )
            }
            <button
                onClick={props.clicked}
                disabled={props.disabled}
            >أضف المسلسل</button>
        </form>
    )
}

export default Form
