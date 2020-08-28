import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { useState } from 'react';
import styles from './country_selector.module.scss'
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';


const list = {
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            when: "afterChildren",
        },
    },
};

const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
};

const CountrySelector = ({setState}) => {

    const [country, setCountry] = useState();
    const [region, setRegion] = useState();

    const handleSetCountry = (country) =>{
        setState('provincia',country);
        setCountry(country);
    }

    const handleSetRegion = (region) =>{
        setState('localidad',region);
        setRegion(region);
    }

    return (
        <Row lg={12} md={12} sm={12} xs={12}>
            <motion.span
                initial="hidden"
                animate="visible"
                variants={list}
                style={{ listStyleType: "none", marginLeft: "0", display: 'flex', width: '100%' }}
            >
                <Col lg={6} md={6} sm={12} xs={12} className={styles.country_container}>
                    <motion.li variants={item}>
                        <CountryDropdown
                            defaultOptionLabel="Seleccione un país"
                            value={country}
                            onChange={(country) => handleSetCountry(country)}
                            style={{
                                padding: '15px 0 15px 8px',
                                background: '#f1f1f1',
                                borderRadius: '5px',
                                color: '#6c7175',
                                borderColor: '#bfbfbf',
                                cursor: 'pointer',
                                width: '100%',
                                outline: 'none',
                            }}
                        />
                    </motion.li>
                </Col>

                <Col lg={6} md={6} sm={12} xs={12} className={styles.region_container}>
                    <motion.li variants={item}>
                        <RegionDropdown
                            disableWhenEmpty={true}
                            country={country}
                            value={region}
                            defaultOptionLabel="Seleccione una provincia"
                            onChange={(region) => handleSetRegion(region)}
                            style={{
                                padding: '15px 0 15px 8px',
                                background: '#f1f1f1',
                                borderRadius: '5px',
                                color: '#6c7175',
                                borderColor: '#bfbfbf',
                                width: '100%',
                                cursor: 'pointer',
                                outline: 'none',
                            }}
                        />
                    </motion.li>
                </Col>

            </motion.span>
        </Row>
    )

}

export default CountrySelector