/* MATERIAL UI */
import MUIDataTable from "mui-datatables";
import { IconButton } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

/* HOOKS */
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

/* COMPONENTS */
import ModalUser from '../../../src/components/Users/modal_user';
import AlertDialog from '../../../src/components/Users/confirmation_dialog';
import BackgroundLoader from '../../../src/components/commons/background_loader/background_loader';
import TitlePage from '../../../src/components/commons/title_page/title_page';

import Config from '../../../src/utils/Config';
import CrudUser from '../../../src/utils/crud_user';

import useSWR, { trigger, mutate } from 'swr';
import { Row, Col } from 'react-bootstrap';
import { motion } from "framer-motion";


const Accounts = () => {
  const url = `${Config.api_url}/users/list`;

  /* const [dataUsers, setDataUsers] = useState(null); */
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState({});
  const [type, setType] = useState(null);
  const [show, setShow] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [groups, setGroups] = useState({});

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

  useSWR(`${Config.api_url}/users/groups/list`, () => {
    CrudUser.getGroups(user.user.token).then((result) => {
      setGroups(result.data);
    });
  })


  const handleClose = () => {
    setShow(false);
    setShowAlertDialog(false);
    setSelectedUser({});
  };


  const handleSubmit = (userData, type) => {
    if (type == "Editar") {

      CrudUser.editUser(userData, user.user.token).then((result) => {
        mutate(`${Config.api_url}/users/list`);
      });

    }

    if (type == "Agregar") {
      console.log(userData);
      CrudUser.addUser(userData, user.user.token).then(() => {
        mutate(`${Config.api_url}/users/list`);
      });
    }

    handleClose();

  }


  const handleDelete = (data) => {
    setShowAlertDialog(true);
    setSelectedUser(data);
  }

  const handleDeleteConfirmation = () => {
    setShowAlertDialog(false);
    CrudUser.deleteUser(selectedUser, user.user.token).then(() => {
      mutate(`${Config.api_url}/users/list`);
    });

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
            <IconButton onClick={() => handleShowModal(data[dataIndex], "Editar")}>
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

  /*  if (!data) return <div>loading...</div> */

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
              className="d-block mt-3 mb-3 ml-auto ontrack_btn_add"
              onClick={() => handleShowModal(selectedUser, "Agregar")}>Crear Cuenta</button>
          </Col>
        </Row>

        {
          show ?
            <ModalUser
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              user={selectedUser}
              type={type}
              groups={groups}
            />
            : null
        }

        {
          showAlertDialog ?
            <AlertDialog
              open={showAlertDialog}
              handleClose={handleClose}
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

