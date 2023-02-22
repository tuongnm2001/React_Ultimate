import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation, Trans } from 'react-i18next';

const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;
    const { t } = useTranslation();
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                size='md'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('detail-quiz.your-result')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>{t('detail-quiz.total-q')}: <b>{dataModalResult.countTotal}</b></div>
                    <div>{t('detail-quiz.correct-answer')}: <b>{dataModalResult.countCorrect}</b></div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('detail-quiz.show-answer')}
                    </Button>
                    <Button className='btn btn-danger' onClick={handleClose}>
                        {t('detail-quiz.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;
