import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';

const ModalViewUser = (props) => {

    const { show, setShow, dataView } = props;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setEmail(dataView.email)
            setPassword('********')
            setUsername(dataView.username)
            setRole(dataView.role)
            if (dataView.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataView.image}`)
            }
        }
    }, [dataView])

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
                    <Modal.Title>VIEW</Modal.Title>
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
                            />
                        </div>


                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                value={password}
                                type="password"
                                className="form-control"
                                disabled
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                value={username}
                                type="text"
                                className="form-control"
                                disabled
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select disabled className="form-select" value={role}>
                                <option value='USER'>USER</option>
                                <option value='ADMIN'>ADMIN</option>
                            </select>
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
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;