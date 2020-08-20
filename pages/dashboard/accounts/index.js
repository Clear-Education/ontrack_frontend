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
import AddUserForm from '../../../src/components/users/forms/add_user_form';
import EditUserForm from "../../../src/components/users/forms/edit_user_form";
import BackgroundLoader from '../../../src/components/commons/background_loader/background_loader';
import TitlePage from '../../../src/components/commons/title_page/title_page';

import config from '../../../src/utils/config';

import { getUserService, addUserService, editUserService, editUserStateService } from '../../../src/utils/user/service/user_services';

import useSWR, { mutate } from 'swr';
import { Row, Col } from 'react-bootstrap';
import { motion } from "framer-motion";


const Accounts = () => {
  const url = `${config.api_url}/users/list`;

  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState({});
  const [addUserModal, setAddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  /*   const [showAlertDialog, setShowAlertDialog] = useState(false); */


  const user = useSelector((store) => store.user);

  useSWR(url, () => {
    setIsLoading(true);
    getUserService(user.user.token).then((result) => {
      setIsLoading(false);
      setAllData(result.result.results);
    })
  });

  const handleAddUserModal = (value) => {
    setAddUserModal(value);
  }

  async function handleSubmitNewUser(e, data) {
    e.preventDefault();
    setIsLoading(true);
    return await addUserService(data, user.user.token).then((result) => {
      setIsLoading(false);
      mutate(url);
      return result;

    })
  }

  const handleEditUserModal = (value, data) => {
    setEditUserModal(value);
    setSelectedUser(data);

  }

  async function handleSubmitEditUser(e, data) {
    e.preventDefault();
    setIsLoading(true);
    return await editUserService(data, user.user.token).then((result) => {
      setIsLoading(false);
      mutate(url);
      return result;
    })
  }

  async function handleSubmitEditUserState(e, data) {
    e.preventDefault();
    return await editUserStateService(data, user.user.token).then((result) => {
      setIsLoading(false);
      mutate(url);
      return result;
    })
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
      name: "is_active",
      label: "Estado",
    },
    {
      name: "actions",
      label: "Acciones",
      options: {
        customBodyRenderLite: (dataIndex) => {
          return (<>
            <IconButton onClick={() => handleEditUserModal(true, allData[dataIndex])}>
              <EditIcon />
            </IconButton>
            {/*             <IconButton onClick={() => handleDelete(data[dataIndex])}>
              <Delete />
            </IconButton> */}
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
              data={allData?.map(user => {
                const estado = user.is_active ? "Activo" : "Suspendido";
                return [
                  user.id,
                  user.name,
                  user.last_name,
                  user.dni,
                  user.legajo,
                  user.cargo,
                  user.email,
                  estado
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
                handleSubmitEditUserState={handleSubmitEditUserState}
                user={selectedUser}
                handleClose={handleEditUserModal} />
            }
          />
        }

        {/*         {
          showAlertDialog ?
            <AlertDialog
              open={showAlertDialog}
              handleClose={handleCloseAlertDialog}
              user={selectedUser}
              handleDeleteConfirmation={handleDeleteConfirmation}
            />
            : null
        } */}
      </motion.div>
    </>
  )

}

export default Accounts;

