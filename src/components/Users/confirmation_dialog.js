import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
            >
                <DialogTitle id="alert-dialog-title">{`Desea eliminar al usuario ${props.user.name} ${props.user.last_name}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Los datos serán eliminados de forma permanente.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
          </Button>
                    <Button onClick={handleDeleteConfirmation} color="primary" autoFocus>
                        Eliminar
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}