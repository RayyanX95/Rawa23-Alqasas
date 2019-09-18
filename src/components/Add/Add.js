import React, { Component } from 'react';

import Form from '../Form/Form';
import Modal from '../UI/Modal/Modal';
import Category from '../Categories/Category/Category';
import classes from './Add.module.css';

const ADD_EPISODE = {
    imgURL: {
        val: '',
        placeholder: ' *ادخل صورة غلاف الحلقة'
    },
    videoID: {
        val: '',
        placeholder: '* (videoID) ادخل رابط الحلقة'
    },
    episodeName: {
        val: '',
        placeholder: '* أدخل اسم الحلقة بالعربي '
    },
};
const ADD_SERIES = {
    arabicName: {
        val: '',
        placeholder: '*أدخل اسم المسلسل بالعربي '
    },
    englishName: {
        val: '',
        placeholder: '*أدخل اسم المسلسل بالانجليزي '
    },
    imgURL: {
        val: '',
        placeholder: '*أدخل رابط صورة الغلاف المسلسل '
    },
    episodeNo: {
        val: '',
        placeholder: 'أدخل عدد حلقات المسلسل '
    },
    description: {
        val: '',
        placeholder: 'أدخل وصف مبسط للمسلس '
    },
}

class Add extends Component {
    state = {
        addSeriesForm: ADD_SERIES,
        btnDisabled: false,
        showAlertMsg: false,
        isAddSuccessful: true,
    }

    inputChangedHandler = (e, inputID) => {
        const addForm = { ...this.state.addSeriesForm };
        const addMovieElement = { ...addForm[inputID] }
        addMovieElement.val = e.target.value;

        addForm[inputID] = addMovieElement;
        this.setState({ addSeriesForm: addForm });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.addSeriesForm) {
            formElementsArray.push({
                id: key,
                fieldsElements: this.state.addSeriesForm[key]
            });
        }

        return (
            <React.Fragment>
                <div className={classes.Container + " container"} >
                    <div className='row justify-content-center mb-5'>
                        <Form
                            formElementsArray={formElementsArray}
                            formInfo={this.state.addSeriesForm}
                            disabled={false}
                            inputChangedHandler={this.inputChangedHandler}
                            clicked={this.props.askAddSeries} />
                    </div>
                </div>

                <Modal
                    show={this.props.isShowModal}
                    closeModal={this.props.closeModal}
                >
                    <div className={classes.ModalContainer} >
                        <p className={classes.Par} >لو هناك خطا في النوذج المعروض امامك الان، رجاءً تاكد من البيانات التي ادخلتها وأد المحاولة</p>
                        <div className={classes.Preview} >
                            <Category
                                preview={true}
                                arabicName={this.state.addSeriesForm.arabicName.val}
                                imgURL={this.state.addSeriesForm.imgURL.val}
                                description={this.state.addSeriesForm.description.val}
                                episodeNo={this.state.addSeriesForm.episodeNo.val}
                            />
                        </div>
                        <div className={classes.BtnContainer} >
                            <button
                                className={classes.ConfirmBtn}
                                onClick={() => this.props.addSeries(this.state.addSeriesForm)} >تأكيد رفع المسلسل</button>
                            <button
                                className={classes.ReturnBtn}
                                onClick={this.props.closeModal} >رجوع للتعديل</button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Add
