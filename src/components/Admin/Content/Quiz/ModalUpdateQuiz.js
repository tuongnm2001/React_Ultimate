import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { putUpdateQuiz } from '../../../../service/apiService';
import _ from 'lodash'
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';

const ModalUpdateQuiz = (props) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('EASY')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const { t } = useTranslation();

    const { isShowModalUpdate, setIsShowModalUpdate, dataUpdate } = props

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name)
            setDescription(dataUpdate.description)
            setType(dataUpdate.difficulty)
            setImage('')
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const handleClose = () => {
        setIsShowModalUpdate(false)
    }

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage('')
        }
    }

    const handleSubmitUpdateQuiz = async () => {
        let res = await putUpdateQuiz(dataUpdate.id, name, description, type, image);
        if (res && res.EC === 0) {
            console.log('check res : ', res);
            toast.success(res.EM)
            handleClose();
            props.fetAllQuiz()
        } else {
            toast.error(res.EM)
        }

    }

    return (
        <>
            <Modal
                show={isShowModalUpdate}
                onHide={handleClose}
                size='lg'
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('manage-quiz.update-quiz')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">{t('manage-quiz.name')}</label>
                            <input
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>


                        <div className="col-md-6">
                            <label className="form-label">{t('manage-quiz.description')}</label>
                            <input
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">{t('manage-quiz.quiz-type')}</label>
                            <select className="form-select" value={type} onChange={(event) => setType(event.target.value)}>
                                <option value='EASY'>{t('manage-quiz.easy')}</option>
                                <option value='MEDIUM'>{t('manage-quiz.medium')}</option>
                                <option value='HARD'>{t('manage-quiz.hard')}</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='lableUpload'>
                                {t('manage-user.upload-image')}
                            </label>
                            <input
                                hidden
                                type='file'
                                id='lableUpload'
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>

                        <div className='col-md-12 img-preview'>
                            {
                                previewImage ?
                                    <img src={previewImage} />
                                    :
                                    <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('setting.close')}
                    </Button>
                    <Button className='btn btn-warning' variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        {t('setting.save')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz;