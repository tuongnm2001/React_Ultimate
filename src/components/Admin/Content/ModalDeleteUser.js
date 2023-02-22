import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../service/apiService';
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;
    const { t } = useTranslation();

    const handleClose = () => setShow(false);

    const handleSubmitDeleteUser = async () => {
        const data = await deleteUser(dataDelete.id);

        if (data && data.EC === 0) {
            toast.success('Xóa người dùng thành công.')
            handleClose();
            // await props.fetchListUser();
            props.setCurrentPage(1);
            await props.fetchListUserWithPaginate(1);
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
                    <Modal.Title>{t('manage-user.title-delete')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {t('manage-user.delete-user')} <b style={{ color: 'red' }}>{dataDelete && dataDelete.email ? dataDelete.email : ''}</b>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('setting.close')}
                    </Button>
                    <Button className='btn btn-danger' onClick={() => handleSubmitDeleteUser()}>
                        {t('setting.delete')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;
