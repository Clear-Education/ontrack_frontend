import Layout from '../../src/components/Layout';
import MUIDataTable from "mui-datatables";
import { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';



const Users = ({ listUsers }) => {

    const [lista, setLista] = useState(listUsers);
    const [selectedUser, setSelectedUser] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setSelectedUser({});
    };

    function handleShowModal(user, type) {
        setSelectedUser(user);
        setShow(true);
    }

    const columns = ["Nombre", "Apellido", "Legajo", "Cargo", {
        name: "Editar",
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRenderLite: (dataIndex) => {
                return (
                    <button onClick={() => handleShowModal(lista[dataIndex])}>
                        Editar
                    </button>
                );
            }
        }
    },
        {
            name: "Eliminar",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <button onClick={() => {
                            setLista(lista.filter(item => item != lista[dataIndex]));
                        }}>
                            Eliminar
                        </button>
                    );
                }
            }
        }];

    const options = {
        filterType: 'dropdown',
        selectableRows: 'none'
    };

    return (
        <Layout title="Cuentas de Usuario">
            <MUIDataTable
                title={"Lista de Usuarios"}
                data={lista.map(user => {
                    return [
                        user.nombre,
                        user.apellido,
                        user.legajo,
                        user.cargo
                    ]
                })}
                columns={columns}
                options={options}
            />



        </Layout>
    )
}

export async function getStaticProps() {
    const res = await axios.get('http://localhost:4001/users');

    let data = res.data;
    return { props: { listUsers: data } }
}


export default Users;