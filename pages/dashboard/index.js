import Layout from '../../src/components/Layout';
import MUIDataTable from "mui-datatables";
import { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import ModalUser from '../../src/components/Users/ModalUser';
import CrudUser from '../../src/utils/CrudUser';




const Users = ({ listUsers }) => {

    const [lista, setLista] = useState(listUsers);
    const [selectedUser, setSelectedUser] = useState({});
    const [type, setType] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setSelectedUser({});
    };
    

    const handleSubmit = (user) =>{
        CrudUser.editUser(user)
    }

    const handleDelete = (data) =>{
        confirm("Seguro que desea eliminar a : "+data)
    }

    function handleShowModal(user, type) {
        setSelectedUser(user);
        setType(type)
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
                    <button onClick={() => handleShowModal(lista[dataIndex],"Editar")}>
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
                            handleDelete(lista[dataIndex])
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

{show ?
        <ModalUser 
        handleClose = {handleClose}
        user = {selectedUser}
        type = {type}
        />
: null
}

        </Layout>
    )
}

export async function getStaticProps() {
    const res = await axios.get('http://localhost:4001/users');

    let data = res.data;
    return { props: { listUsers: data } }
}


export default Users;