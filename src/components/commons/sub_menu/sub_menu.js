import { IconButton } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import ConfigIcon from "../icons/config_icon";
import InfoIcon from "../icons/info_icon";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SubMenu = () => {
    const router = useRouter();
    const [paramId, setParamId] = useState();
    const [selected, setSelected] = useState('info');

    useEffect(()=>{
        let params = Object.values(router.query);
        let id = params[0];
        setParamId(id);
    },[router.query])

    useEffect(() => {
        const selectedPage = window.location.href.match(/\/([^\/]+)\/?$/)[1];
        if (selectedPage === 'configuracion') {
            setSelected(selectedPage);
        }
    }, [router.route]);

    const getSelected = (icon) => {
        if (icon === selected) {
            return 'var(--main-color-dark)'
        }
    }

    return (
        <>
            <Row lg={12} md={12} sm={12} xs={12}>

                <Col lg={12} md={12} sm={12} xs={12}>
                    <Link href={`/dashboard/seguimientos/${paramId}`}>
                        <IconButton>
                            <InfoIcon color={getSelected('info')} />
                        </IconButton>
                    </Link>
                </Col>

                <Col lg={12} md={12} sm={12} xs={12}>
                    <Link href={`/dashboard/seguimientos/${paramId}/configuracion`}>
                        <IconButton>
                            <ConfigIcon color={getSelected('configuracion')} />
                        </IconButton>
                    </Link>
                </Col>
            </Row>

        </>
    )
}

export default SubMenu;