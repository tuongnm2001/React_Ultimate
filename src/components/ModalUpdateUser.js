import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalAddUser.scss'
import img1 from '../assets/image1.jpg'
import { putUpdateUser } from '../service/apiService';
import { async } from 'q';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const ModalUpdateUser = (props) => {

    const { showModalUpdate, setShowModalUpdate, dataUpdateUser, fetAllUser } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('')
    const [previewImg, setPreviewImg] = useState('')

    useEffect(() => {
        setEmail(dataUpdateUser.email)
        setPassword('******')
        setUsername(dataUpdateUser.username)
        setRole(dataUpdateUser.role)
        if (dataUpdateUser.image) {
            setPreviewImg(`data:image/jpeg;base64,${dataUpdateUser.image}`)
        }
    }, [dataUpdateUser])

    const handleClose = () => {
        setShowModalUpdate(false)
    }

    const handleUploadImage = (e) => {
        setPreviewImg(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
    }

    const handleUpdateUser = async () => {
        let res = await putUpdateUser(dataUpdateUser.id, username, role, image)
        if (res && res.EC === 0) {
            alert('Update success')
            handleClose()
            fetAllUser()
        }
    }

    return (
        <div>
            <Modal
                show={showModalUpdate}
                onHide={handleClose}
                size='lg'
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="row g-3">
                        <div className='col-md-6'>
                            <span>Email</span>
                            <input
                                type={'text'}
                                className='form-control'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled
                            />
                        </div>

                        <div className='col-md-6'>
                            <span>Password</span>
                            <input
                                type={'password'}
                                className='form-control'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled
                            />

                        </div>

                        <div className='col-6'>
                            <span>Username</span>
                            <input
                                type={'text'}
                                className='form-control'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className='col-6'>
                            <span>Rolo</span>
                            <select className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                                <option value='USER'>USER</option>
                                <option value='ADMIN'>ADMIN</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label className='form-label' htmlFor='lableUpload'>Upload Image</label>
                            <input
                                type={'file'}
                                hidden
                                id='lableUpload'
                                onChange={(e) => handleUploadImage(e)}
                            />
                        </div>

                        <div className='col-md-12 img-preview'>
                            {
                                previewImg ?

                                    <img src={previewImg} />
                                    :
                                    <span>No img</span>
                            }
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateUser}>
                        Update
                    </Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default ModalUpdateUser;