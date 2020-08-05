import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" {...props} />;
});

export default function AlertDialog(props) {

    const handleClose = () => {
        props.handleClose();
    };

    const handleDeleteConfirmation = () => {
        props.handleDeleteConfirmation();
    }


    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <DialogTitle id="alert-dialog-title">{`Desea eliminar al usuario ${props.user.name} ${props.user.last_name}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Los datos serán eliminados de forma permanente.
          </DialogContentText>
                </DialogContent>
                <DialogActions className="d-flex justify-content-around">
                    <button onClick={handleClose} className=" mt-3 mb-3 ontrack_btn_cancel">
                        Cancelar
          </button>
                    <button onClick={handleDeleteConfirmation} className=" mt-3 mb-3 ontrack_btn_add">
                        Eliminar
          </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}