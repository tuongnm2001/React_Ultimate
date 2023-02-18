import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../service/apiService';
import _ from 'lodash';

const ModalUpdateUser = (props) => {

    const { show, setShow, dataUpdate } = props;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email)
            setPassword('********')
            setUsername(dataUpdate.username)
            setRole(dataUpdate.role)
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const handleClose = () => {
        setShow(false)
        setEmail('')
        setPassword('')
        setUsername('')
        setRole('')
        setImage('')
        setPreviewImage('')
        props.resetUpdateData()

    };

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage('')
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitUpdateUser = async () => {

        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error('Email không hợp lệ.')
            return;
        }

        //call api from service
        let data = await putUpdateUser(dataUpdate.id, username, role, image)

        if (data && data.EC === 0) {
            toast.success('Cập nhật người dùng thành công.')
            handleClose()
            // await props.fetchListUser();
            // props.setCurrentPage(1);
            await props.fetchListUserWithPaginate(props.currentPage);
        }

        if (data && data.EC !== 0) {
            toast.error('Cập nhật người dùng thất bại.')
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='lg'
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>UPDATE NEW USER</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                value={email}
                                type="email"
                                className="form-control"
                                disabled
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>


                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                value={password}
                                type="password"
                                className="form-control"
                                disabled
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                value={username}
                                type="text"
                                className="form-control"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                                <option value='USER'>USER</option>
                                <option value='ADMIN'>ADMIN</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='lableUpload'>
                                <FcPlus /> Upload File Image
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
                        Close
                    </Button>
                    <Button className='btn btn-warning' variant="primary" onClick={handleSubmitUpdateUser}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;