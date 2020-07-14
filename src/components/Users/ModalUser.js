import { Modal, Button } from 'react-bootstrap';

const ModalUser = (props) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.type} Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.type === 'edit' ?

                    <FormEditUser user={props.user} />
                    :
                    <FormAddUser />

                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEdit;