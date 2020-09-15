import { useSelector } from "react-redux";
import { useState } from "react";
import config from "../../../src/utils/config";
import SolicitudesDocente from "../../../src/components/solicitudes/solicitudes_docente";
import SolicitudesPedagogo from "../../../src/components/solicitudes/solicitudes_pedagogo";


const Solicitudes = () => {

    const url = `${config.api_url}/`
    const [selectedData, setSelectedData] = useState()
    const user = useSelector((store) => store.user);


    return (
        <>
            {
                user.user.groups == "Docente" ? <SolicitudesDocente /> : <SolicitudesPedagogo />
            }
        </>
    )

}


export default Solicitudes;



