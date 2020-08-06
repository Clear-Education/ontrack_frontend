/* import { Modal, Button } from 'react-bootstrap'; */
import { useState, useEffect } from 'react';
import FormUser from './form_user';

// DIALOG COMPONENT
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Select, MenuItem, InputLabel } from '@material-ui/core';




const INITIAL_STATE_USER = {
    nombre: '',
    apellido: '',
    email: ''
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" {...props} />;
});


const ModalUser = (props) => {
    const [user, setUser] = useState(props.user);

    const handleChange = (input, value) => {
        setUser({ ...user, [input]: value });
    }

    const handleClose = () => {
        props.handleClose();
    }

    const handleSubmit = () => {
        props.handleSubmit(user, props.type);
    }

    return (
        <Dialog
            open={true}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            TransitionComponent={Transition}
        >
            <DialogTitle className="center" id="form-dialog-title">{props.type} Usuario</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`Ingrese la información solicitada para ${props.type} Usuarios de su Institución`}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre"
                    type="text"
                    defaultValue={user.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="apellido"
                    label="Apellido"
                    type="text"
                    defaultValue={user.last_name}
                    onChange={(event) => handleChange("last_name", event.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="email"
                    label="Correo Electrónico"
                    type="email"
                    defaultValue={user.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="dni"
                    label="DNI"
                    type="number"
                    defaultValue={user.dni}
                    onChange={(event) => handleChange("dni", event.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="legajo"
                    label="Legajo"
                    type="number"
                    defaultValue={user.legajo}
                    onChange={(event) => handleChange("legajo", event.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="cargo"
                    label="Cargo"
                    type="text"
                    defaultValue={user.cargo}
                    onChange={(event) => handleChange("cargo", event.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="password1"
                    label="Contraseña"
                    type="password"
                    defaultValue={user.password}
                    onChange={(event) => handleChange("password", event.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="password2"
                    label="Repetir Contraseña"
                    type="password"
                    defaultValue={user.password2}
                    onChange={(event) => handleChange("password2", event.target.value)}
                    fullWidth
                />
                <InputLabel className="mt-3" id="demo-simple-select-label">Cuenta</InputLabel>
                <Select
                    margin="dense"
                    id="tipo_cuenta"
                    label="Tipo de Cuenta"
                    defaultValue={props.groups.name || ''}
                    onChange={(event) => handleChange("groups", event.target.value)}
                    fullWidth
                >
                    {props.groups &&
                        props.groups?.map((group) => {
                            return (
                                <MenuItem value={group.id} key={group.id}>{group.name}</MenuItem>
                            );
                        })}
                </Select>
                <TextField
                    margin="dense"
                    id="telefono"
                    label="Teléfono"
                    type="number"
                    defaultValue={user.phone}
                    onChange={(event) => handleChange("phone", event.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="fecha_nacimiento"
                    label="Fecha de Nacimiento"
                    type="date"
                    defaultValue={user.date_of_birth}
                    onChange={(event) => handleChange("date_of_birth", event.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="direccion"
                    label="Dirección"
                    type="text"
                    defaultValue={user.direccion}
                    onChange={(event) => handleChange("direccion", event.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="localidad"
                    label="Localidad"
                    type="text"
                    defaultValue={user.localidad}
                    onChange={(event) => handleChange("localidad", event.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="provincia"
                    label="Provincia"
                    type="text"
                    defaultValue={user.provincia}
                    onChange={(event) => handleChange("provincia", event.target.value)}
                    fullWidth
                />

            </DialogContent>
            <DialogActions className="d-flex justify-content-end">
                <button className=" ontrack_btn_cancel" onClick={handleClose} >
                    Cancelar
                </button>
                <button className=" ontrack_btn_add" onClick={handleSubmit} >
                    Guardar
                </button>
            </DialogActions>
        </Dialog>

    )
}

export default ModalUser;

{/* <Modal show={true} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>{props.type} Usuario</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {
            (props.type === "Editar") || (props.type === "Agregar") ?
                <FormUser
                    user={props.user}
                    handleChange={handleChange}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
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
</Modal> */}