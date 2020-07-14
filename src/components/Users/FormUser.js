import { Form, Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';

const INITIAL_STATE_USER = {
    nombre: '',
    apellido: '',
    email: ''
}

const FormUser = (user) => {

    const [user, setUser] = useState(INITIAL_STATE_USER);

    useEffect(() => {
        if (user) {
            setUser(user)
        }
    }, [user]);

    <Container className="mt-5">
        <Form>
            <Form.Group as={Row} controlId="formPlaintextPassword1">
                <Form.Label column sm="2">
                    Nombre
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" defaultValue={user.nombre} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextPassword2">
                <Form.Label column sm="2">
                    Apellido
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" defaultValue={user.apellido} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Email
                </Form.Label>
                <Col sm="10">
                    <Form.Control defaultValue={user.email} onChange={(e) => e.target.value} />
                </Col>
            </Form.Group>
        </Form>
    </Container>
}

export default FormUser;