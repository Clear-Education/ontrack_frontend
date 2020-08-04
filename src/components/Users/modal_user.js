import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import FormUser from './form_user';


const INITIAL_STATE_USER = {
    nombre: '',
    apellido: '',
    email: ''
}


const ModalUser = (props) => {
    const [user, setUser] = useState(props.user);

    const handleChange = (input, value) => {
        setUser({ ...user, [input]: value })
    }

    const handleClose = () => {
        props.handleClose()
    }

    const handleSubmit = () => {
        props.handleSubmit(user, props.type);
    }

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.type} Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    (props.type === "Editar") || (props.type === "Agregar") ?
                        <FormUser
                            user={props.user}
                            handleChange={handleChange}
                        />
                        :
                        <FormUser />
                }

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUser;