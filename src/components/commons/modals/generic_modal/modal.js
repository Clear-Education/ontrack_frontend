/** Estructura genérica de Modal, los estilos generales se configuran desde el archivo global.scss
@param {string} title - Recibe un título para mostrar en la cabecera del modal
@param {Component} button - Recibe un botón para renderizar, que será el encargado de abrir el modal
@param {Component} form - Recibe un form para renderizar en el cuerpo del modal, que deberá incluir las funcionalidades que éste ejecuta

Ejemplo de uso
        <Modal 
        title="Agregar usuario"
        form = "<FormAddUser addUserAction={addUserAction} />"
        button= {<button>Agregar Usuario</button>}
        />
*/




import { useState } from "react";
import styles from './styles.module.scss'


/* Components imports */

const { Dialog, DialogTitle, DialogContent, Slide } = require("@material-ui/core")

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = (props) => {


    const [show, setShow] = useState(false);
    const handleVisibilityModal = (value) => {
        setShow(value);
    }
    
    let form_component = {...props.formComponent};
    form_component.props = {...props.formComponent.props,handleClose:handleVisibilityModal}

    return (
        <>
            {show ?
                <Dialog
                    open={show}
                    onClose={()=>handleVisibilityModal(false)}
                    fullScreen={true}
                    className="responsive_modal center"
                    TransitionComponent={Transition}
                >
                    <img
                        onClick={()=>handleVisibilityModal(false)}
                        src="/icons/close.svg"
                        className={styles.close_modal}
                    />
                    <DialogTitle className={styles.modal_title}>{props.title}</DialogTitle>
                    <DialogContent>
                        <div>
                            {form_component}
                        </div>
                    </DialogContent>
                </Dialog>
                :
                <div onClick={()=>handleVisibilityModal(true)} syle={{backgroundColor:'red'}}>
                    {props.button}
                </div>
            }
        </>
    )
}


export default Modal