import MUIDataTable from "mui-datatables";
import { useState, useEffect } from 'react';
import ModalUser from '../../../src/components/Users/modal_user';
import useSWR from 'swr';
import CrudUser from '../../../src/utils/crud_user';
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Button } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import config from "../../../src/utils/config";

const Accounts = () => {
  const url = `${config.api_url}/users/list`
  const [dataUsers, setDataUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});
  const [type, setType] = useState(null);
  const [show, setShow] = useState(false);

  const user = useSelector((store) => store.user);
  useSWR(url, () =>
    CrudUser.getUsers(user.user.token).then((result) => {
      setDataUsers(result.data.results);
      return;
    })
  );


  const handleClose = () => {
    setShow(false);
    setSelectedUser({});
  };


  const handleSubmit = (userData, type) => {
    if (type == "Editar") {
      CrudUser.editUser(userData, user.user.token);
      console.log("editar");
    }
    if (type == "Agregar") {
      CrudUser.addUser(userData, user.user.token)
      console.log("agregar");
    }

  }

  const handleDelete = (data) => {
    confirm("Seguro que desea eliminar al usuario : " + data.name + ` ${data.last_name}`);
  }

  function handleShowModal(user, type) {
    setSelectedUser(user);
    setType(type);
    setShow(true);
  }

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false
      },

    },
    {
      name: "name",
      label: "Nombre",
    },
    {
      name: "surname",
      label: "Apellido",
    },
    {
      name: "dni",
      label: "DNI",
    },
    {
      name: "legajo",
      label: "Legajo",
    },
    {
      name: "cargo",
      label: "Cargo",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "actions",
      label: "Acciones",
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (<>
            <IconButton onClick={() => handleShowModal(dataUsers[dataIndex], "Editar")}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(dataUsers[dataIndex])}>
              <Delete />
            </IconButton>
          </>)
        },
      },
    }
  ];
  const options = {
    downloadOptions: { filename: "Usuarios.csv" },
    viewColumns: false,
    sort: true,
    selectableRowsHeader: false,
    selectableRows: "none",
    filter: false,
    responsive: 'standard',
    textLabels: {
      body: {
        noMatch: "No se encontraron registros.",
      },
      pagination: {
        next: "Siguiente Página",
        previous: "Página Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
      },
    },
  };

  if (!dataUsers) return <div>loading...</div>

  return (
    <div className="container pl-5">
      <MUIDataTable
        title={"Lista de Usuarios"}
        data={dataUsers.map(user => {
          return [
            user.id,
            user.name,
            user.last_name,
            user.dni,
            user.legajo,
            user.cargo,
            user.email
          ]
        })}
        columns={columns}
        options={options}
      />

      <Button
        variant="outlined"
        color="primary"
        className="d-block mt-5 ml-auto"
        onClick={() => handleShowModal(selectedUser, "Agregar")}>Crear Cuenta</Button>

      {show ?
        <ModalUser
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          user={selectedUser}
          type={type}
        />
        : null
      }
    </div>
  )

}

export default Accounts;

