import Layout from '../src/components/Layout';
import Auth from '../src/utils/Auth';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';


const Users = ({ listUsers }) => {
    return (
        < Layout title="Users" >
            <h2 className="mt-4">
                Lista de Usuarios
            </h2>
            <Container>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>Nombre y Apellido</th>
                            <th>Legajo</th>
                            <th>Cargo</th>
                            <th>Tipo</th>
                            <th>Mail</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {listUsers.map((user) => (
                            <tr>
                                <td>{user.nombre} {user.apellido}</td>
                                <td>{user.legajo}</td>
                                <td>{user.cargo}</td>
                                <td>{user.group.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </Layout>

    )
}

export async function getServerSideProps() {
    const res = await axios.get('http://localhost:4001/users');

    let data = res.data;
    return { props: { listUsers: data } }
}


export default Users;