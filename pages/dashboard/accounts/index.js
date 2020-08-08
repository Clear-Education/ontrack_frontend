/* MATERIAL UI */
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

/* HOOKS */
import { useState } from 'react';
import { useSelector } from "react-redux";

/* COMPONENTS */
import ModalAdd from '../../../src/components/commons/modals/modal_add/modal_add';
import AddUserForm from '../../../src/components/Users/forms/add_user_form';
import EditUserForm from "../../../src/components/Users/forms/edit_user_form";
import AlertDialog from '../../../src/components/Users/confirmation_dialog';
import BackgroundLoader from '../../../src/components/commons/background_loader/background_loader';
import TitlePage from '../../../src/components/commons/title_page/title_page';

import config from '../../../src/utils/config';
import CrudUser from '../../../src/utils/crud_user';

import useSWR, { mutate } from 'swr';
import { Row, Col } from 'react-bootstrap';
import { motion } from "framer-motion";


const Accounts = () => {
  const url = `${config.api_url}/users/list`;

  /* const [dataUsers, setDataUsers] = useState(null); */
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState({});
  const [addUserModal, setAddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);


  const user = useSelector((store) => store.user);

  const { data } = useSWR(url, () => {
    setIsLoading(true);
    return CrudUser.getUsers(user.user.token).then((result) => {
      /* setDataUsers(result.data.results); */
      if (result.status == 200) {
        setIsLoading(false);
        return result.data.results;
      }

    })
  }
  );

  const handleCloseAlertDialog = () => {
    setShowAlertDialog(false);
    setSelectedUser({});
  };

  const handleDelete = (data) => {
    setShowAlertDialog(true);
    setSelectedUser(data);
  }

  const handleDeleteConfirmation = () => {
    setShowAlertDialog(false);
    CrudUser.deleteUser(selectedUser, user.user.token).then(() => {
      mutate(`${config.api_url}/users/list`);
    });

  }

  const handleAddUserModal = (value) => {
    setAddUserModal(value);
  }

  const handleSubmitNewUser = (e, data) => {
    e.preventDefault();
    CrudUser.addUser(data, user.user.token).then(() => {
      mutate(`${config.api_url}/users/list`);
    });
  }

  const handleEditUserModal = (value, data) => {
    setEditUserModal(value);
    setSelectedUser(data);

  }

  const handleSubmitEditUser = (e, data) => {
    e.preventDefault();
    CrudUser.editUser(data, user.user.token).then((result) => {
      mutate(`${config.api_url}/users/list`);
    });
  }

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
        filter: false
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
            <IconButton onClick={() => handleEditUserModal(true, data[dataIndex])}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(data[dataIndex])}>
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
    filter: true,
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

  return (
    <>
      {isLoading && <BackgroundLoader show={isLoading} />}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Row lg={12} md={12} sm={12} xs={12} style={{ margin: 0 }}>
          <Col lg={12} md={12} sm={12} xs={12} style={{ padding: 0 }}>
            <TitlePage title="Cuentas de Usuario"></TitlePage>
          </Col>
        </Row>
        <Row lg={12} md={12} sm={12} xs={12} style={{ margin: '5%' }}>
          <Col
            md={12}
            sm={12}
            xs={12}
          >
            <MUIDataTable
              title={"Lista de Usuarios"}
              data={data?.map(user => {
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
          </Col>
          <Col>
            <button
              className="d-block mt-3 mb-3 ml-auto ontrack_btn add_btn"
              onClick={() => handleAddUserModal(true)}>Crear Cuenta</button>
          </Col>
        </Row>

        {addUserModal &&
          <ModalAdd
            title="Agregar Usuario"
            handleClose={handleAddUserModal}
            formComponent={
              <AddUserForm
                handleSubmitNewUser={handleSubmitNewUser}
                handleClose={handleAddUserModal} />
            }
          />
        }

        {editUserModal &&
          <ModalAdd
            title="Editar Usuario"
            handleClose={handleEditUserModal}
            formComponent={
              <EditUserForm
                handleSubmitEditUser={handleSubmitEditUser}
                user={selectedUser}
                handleClose={handleEditUserModal} />
            }
          />
        }

        {
          showAlertDialog ?
            <AlertDialog
              open={showAlertDialog}
              handleClose={handleCloseAlertDialog}
              user={selectedUser}
              handleDeleteConfirmation={handleDeleteConfirmation}
            />
            : null
        }
      </motion.div>
    </>
  )

}

export default Accounts;

