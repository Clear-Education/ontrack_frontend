import React from './node_modules/react';
import Button from './node_modules/@material-ui/core/Button';
import Dialog from './node_modules/@material-ui/core/Dialog';
import DialogActions from './node_modules/@material-ui/core/DialogActions';
import DialogContent from './node_modules/@material-ui/core/DialogContent';
import DialogContentText from './node_modules/@material-ui/core/DialogContentText';
import DialogTitle from './node_modules/@material-ui/core/DialogTitle';
import Slide from './node_modules/@material-ui/core/Slide';
import styles from './styles.module.css';

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
                <DialogTitle className={styles.background_title} id="alert-dialog-title">{`Desea eliminar al usuario ${props.user.name} ${props.user.last_name}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Los datos serán eliminados de forma permanente.
          </DialogContentText>
                </DialogContent>
                <DialogActions className="d-flex justify-content-around">
                    <button onClick={handleClose} className=" mt-3 mb-3 ontrack_btn cancel_btn">
                        Cancelar
          </button>
                    <button onClick={handleDeleteConfirmation} className=" mt-3 mb-3 ontrack_btn add_btn">
                        Eliminar
          </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}