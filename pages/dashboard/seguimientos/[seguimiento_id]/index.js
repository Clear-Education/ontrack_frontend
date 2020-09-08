import TitlePage from "../../../../src/components/commons/title_page/title_page";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

const Seguimiento = () =>{
    const router = useRouter();
    const [id,setId]= useState();
    useEffect(()=>{
        setId(window.location.href.match(/\/([^\/]+)\/?$/)[1])
    },[router.route])

    return(
        <TitlePage title={"Seguimiento " + id}/>

    )

}

export default Seguimiento;