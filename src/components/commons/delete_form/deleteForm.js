import CircularProgress from "@material-ui/core/CircularProgress";
import { useState } from "react";

const DeleteForm = (props) => {

    const [state, setState] = useState(props.data);
    const [isLoading,setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        setIsLoading(true);
        props.handleSubmitAction(e, state).then((result) => {
            setIsLoading(false)
            if (result.success) {
                props.handleClose(false);
            }
        });
    }
    return (
        <button
            onClick={(e) => handleSubmit(e)}
            disabled={isLoading}
            className="ontrack_btn add_btn delete_btn">
            {!isLoading ? `Confirmar` :
                <>
                    <CircularProgress
                        size={18}
                        color="primary"
                    />
                {" "}Eliminando...
                </>
            }
        </button>
    )
}


export default DeleteForm;