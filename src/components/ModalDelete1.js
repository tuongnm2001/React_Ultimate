import { async } from 'q';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../service/apiService';

const ModalDelete1 = (props) => {

    const { showModalDelete, setShowModalDelete, dataDeleteUser, fetAllUser } = props

    const handleDeleteUser = async () => {
        let res = await deleteUser(dataDeleteUser.id)
        console.log(res);
        if (res && res.EC === 0) {
            alert('Delete Success')
        }
        props.fetAllUser()
        handleClose();
    }

    const handleClose = () => {
        setShowModalDelete(false)
    }

    return (
        <Modal
            show={showModalDelete}
            onHide={handleClose}
            backdrop='static'
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want delete <span style={{ color: 'red' }}>{dataDeleteUser.email}</span></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleDeleteUser()}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDelete1