import { useState } from "react";
import styles from './modal_add.module.css'

const { Dialog, DialogTitle, DialogContent, Slide } = require("@material-ui/core")
const SlideTransition = (props) => {
    return <Slide {...props} direction="up" />;
  };

const ModalAddStudent = (props) => {

    const [show, setShow] = useState(true)
    const handleClose = () => {
        setShow(false);
        props.handleClose(false)
    }
    return (
        <Dialog
            open={show}
            onClose={handleClose}
            fullScreen={true}
            className="center"
            TransitionComponent={SlideTransition}
        >
            <img
                onClick={handleClose}
                src="/icons/close.svg"
                className={styles.close_modal}
            />
            <DialogTitle>Agregar Alumnos</DialogTitle>
            <DialogContent>
                <button>
                    Alumno particular
            </button>
                <button>
                    Alumnos por CSV
            </button>
            
            </DialogContent>
        </Dialog>
    )
}


export default ModalAddStudent