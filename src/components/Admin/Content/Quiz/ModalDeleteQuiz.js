import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { getDeleteQuiz } from '../../../../service/apiService';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete, fetAllQuiz } = props;

    const handleClose = () => setShow(false);

    const handleDeleteSubmit = async () => {
        const data = await getDeleteQuiz(dataDelete.id);
        console.log('check data : ', data);
        if (data && data.EC === 0) {
            toast.success('Xóa người dùng thành công.')
            handleClose();
            await fetAllQuiz();
        } else {
            toast.error('Xóa người dùng thất bại.')
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                size='md'
            >
                <Modal.Header closeButton>
                    <Modal.Title>DELETE QUIZ</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Bạn có muốn xóa <b style={{ color: 'red' }}>{dataDelete && dataDelete.name ? dataDelete.name : ''}</b> không ?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CLose
                    </Button>
                    <Button className='btn btn-danger' onClick={() => handleDeleteSubmit()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;
