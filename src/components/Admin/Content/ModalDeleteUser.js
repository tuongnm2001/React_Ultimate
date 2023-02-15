import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmitDeleteUser = () => {
        alert('slf')
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>DELETE USER</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Bạn có muốn xóa <b>{dataDelete && dataDelete.email ? dataDelete.email : ''}</b> không ?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='btn btn-danger' onClick={() => handleSubmitDeleteUser()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;
