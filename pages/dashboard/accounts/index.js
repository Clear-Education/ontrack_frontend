/* MATERIAL UI */
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

/* HOOKS */
import { useState } from 'react';
import { useSelector } from "react-redux";

/* COMPONENTS */
import AddUserForm from '../../../src/components/users/forms/add_user_form';
import EditUserForm from "../../../src/components/users/forms/edit_user_form";
import BackgroundLoader from '../../../src/components/commons/background_loader/background_loader';
import TitlePage from '../../../src/components/commons/title_page/title_page';

import config from '../../../src/utils/config';

import { getUserService, addUserService, editUserService, editUserStateService } from '../../../src/utils/user/service/user_services';

import useSWR, { mutate } from 'swr';
import { Row, Col } from 'react-bootstrap';
import { motion } from "framer-motion";
import Modal from "../../../src/components/commons/modals/modal";
import styles from './index.module.scss'

const Accounts = () => {
  const url = `${config.api_url}/users/list`;

  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState({});
  const user = useSelector((store) => store.user);

  useSWR(url, () => {
    setIsLoading(true);
    getUserService(user.user.token).then((result) => {
      setIsLoading(false);
      setAllData(result.result.results);
    })
  });

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
    setIsLoading(false);
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
        filter: false,
        responsive: 'standard',
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
          return (
            <Modal
              title="Editar Cuenta"
              body={<EditUserForm
                handleSubmitEditUser={handleSubmitEditUser}
                handleSubmitEditUserState={handleSubmitEditUserState}
                user={selectedUser}
                handleClose={handleEditUserModal} />}
              button={
                <IconButton onClick={() => handleEditUserModal(true, allData[dataIndex])}>
                  <EditIcon />
                </IconButton>
              }
            />
          )
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
        <Row lg={12} md={12} sm={12} xs={12} style={{ margin: '0 5% 0 5%' }}>
          <Row lg={12} md={12} sm={12} xs={12} style={{ width: '100%' }}>
            <Col lg={6} md={6} sm={6} xs={6}>
              <TitlePage title="Cuentas de Usuario"></TitlePage>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} className={styles.add_btn_container}
              style={{
                justifyContent: 'flex-end',
                display: 'flex',
                alignItems: 'flex-end'
              }}>
              <Modal
                title="Agregar Cuenta"
                body={<AddUserForm handleSubmitNewUser={handleSubmitNewUser} />}
                button={
                  <button className="ontrack_btn add_btn">Nueva Cuenta</button>
                }
              />
            </Col>
          </Row>
          <Col
            md={12}
            sm={12}
            xs={12}
            style={{ marginTop: 20 }}
          >
            <MUIDataTable
              title={"Lista de Usuarios"}
              data={allData && allData.map(user => {
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
        </Row>

      </motion.div>
    </>
  )

}

export default Accounts;

