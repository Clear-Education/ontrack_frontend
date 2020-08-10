import { useState } from "react";
import styles from './modal_add.module.css'


/* Components imports */



const { Dialog, DialogTitle, DialogContent, Slide } = require("@material-ui/core")

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ModalAdd = (props) => {

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
            className="responsive_modal center"
            TransitionComponent={Transition}
        >
            <img
                onClick={handleClose}
                src="/icons/close.svg"
                className={styles.close_modal}
            />
            <DialogTitle style={{backgroundColor:'var(--main-color-dark)', color:'white'}}>{props.title}</DialogTitle>
            <DialogContent>
                <div>
                   {props.formComponent}
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default ModalAdd