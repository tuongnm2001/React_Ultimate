import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../service/apiService';
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmitDeleteUser = async () => {
        const data = await deleteUser(dataDelete.id);

        if (data && data.EC === 0) {
            toast.success('Xóa người dùng thành công.')
            handleClose();
            await props.fetchListUser();
        }

        if (data && data.EC !== 0) {
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
                    <Modal.Title>DELETE USER</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Bạn có muốn xóa <b style={{ color: 'red' }}>{dataDelete && dataDelete.email ? dataDelete.email : ''}</b> không ?
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
