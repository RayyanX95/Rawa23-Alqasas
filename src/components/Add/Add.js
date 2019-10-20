import React, { Component } from 'react';

import Form from '../Form/Form';
import Modal from '../UI/Modal/Modal';
import Category from '../Categories/Category/Category';
// import YouTubeVideoPlayer from '../Video/YouTubeVideoPlayer';
// import AlertMessage from '../UI/AlertMessage/AlertMessage';
import classes from './Add.module.css';

const ADD_EPISODE = {
    playlistID: {
        val: '',
        placeholder: '* (playlistID / VideoID) ادخل رابط الحلقة'
    },
};
const ADD_SERIES = {
    arabicName: {
        val: '',
        placeholder: '*أدخل اسم المسلسل بالعربي'
    },
    englishName: {
        val: '',
        placeholder: '*أدخل اسم المسلسل بالانجليزي'
    },
    imgURL: {
        val: '',
        placeholder: '*أدخل رابط صورة الغلاف المسلسل'
    },
    episodeNo: {
        val: '',
        placeholder: 'أدخل عدد حلقات المسلسل'
    },
    productionYear: {
        val: '',
        placeholder: 'أدخل سنة الانتاج'
    },
    description: {
        val: '',
        placeholder: 'أدخل وصف مبسط للمسلس'
    },
    startTrailer: {
        val: '',
        placeholder: ' (videoID) أدخل لينك تتر البداية'
    },
    endTrailer: {
        val: '',
        placeholder: ' (videoID) أدخل لينك تتر النهاية'
    },
}

class Add extends Component {
    state = {
        addSeriesForm: ADD_SERIES,
        addEpisodeForm: ADD_EPISODE,
    }

    inputChangedHandler = (e, inputID) => {
        let addForm = { ...this.state.addSeriesForm };
        if (this.props.showEpisodeForm) {
            addForm = { ...this.state.addEpisodeForm };
        }
        const addElement = { ...addForm[inputID] }
        addElement.val = e.target.value;

        addForm[inputID] = addElement;
        if (this.props.showEpisodeForm) {
            this.setState({ addEpisodeForm: addForm });
        }
        else {
            this.setState({ addSeriesForm: addForm });
        }
    }

    reset = () => {
        this.setState({ addSeriesForm: ADD_SERIES, addEpisodeForm: ADD_EPISODE })
    }

    render() {
        const formElementsArray = [];
        let addForm = this.state.addSeriesForm;
        let btnTitle = "المسلسل";
        let addConfirmHandler = this.props.addSeries;
        let formInfo = this.state.addSeriesForm;
        let modalContent = (
            <div className={classes.Preview} >
                <Category
                    preview={true}
                    name={this.state.addSeriesForm.arabicName.val}
                    imgURL={this.state.addSeriesForm.imgURL.val}
                    description={this.state.addSeriesForm.description.val}
                    episodeNo={this.state.addSeriesForm.episodeNo.val}
                />
            </div>
        )
        if (this.props.showEpisodeForm) {
            addForm = this.state.addEpisodeForm;
            modalContent = <h1 className="text-center text-info" >Hey, I'm modalContent!</h1>
            btnTitle = "الحلقة";
            addConfirmHandler = this.props.addEpisode;
            formInfo = this.state.addEpisodeForm;
            if (!this.props.showModal) {
                modalContent = null;
            } else
                modalContent = (
                    <div className={classes.PreviewVideo} >
                        {/* <YouTubeVideoPlayer
                            videoID={this.state.addEpisodeForm.videoID.val}
                            pause={this.props.closeModal} /> */}
                    </div>

                )
        }
        for (const key in addForm) {
            formElementsArray.push({
                id: key,
                fieldsElements: addForm[key]
            });
        }

        return (
            <React.Fragment>
                <div className={classes.Container + " container"} >
                    <div className='row justify-content-center mb-5'>
                        <Form
                            formElementsArray={formElementsArray}
                            formInfo={this.state.addForm}
                            closeAddEpisode={this.props.closeAddEpisode}
                            inputChangedHandler={this.inputChangedHandler}
                            clicked={this.props.askAdd}
                            close={this.props.showEpisodeForm}
                            seriesName={this.props.seriesName} />
                    </div>
                </div>

                <Modal
                    show={this.props.showModal}
                    closeModal={this.props.closeModal}
                >
                    <div className={classes.ModalContainer} >
                        <p className={classes.Par} >لو هناك خطا في النوذج المعروض امامك الان، رجاءً تاكد من البيانات التي ادخلتها وأد المحاولة</p>
                        {modalContent}
                        <div className={classes.BtnContainer} >
                            <button
                                className={classes.ConfirmBtn}
                                onClick={() => { addConfirmHandler(formInfo); this.reset() }} > تأكيد رفع {btnTitle} </button>
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
