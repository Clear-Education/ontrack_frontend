
import React, { useState, useEffect } from "react";

// Import dependencias
import Alert from "react-s-alert";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Department from "../department/department";
import Year from '../year/year'
import Subject from "../subject/subject";
import { Row, Col } from "react-bootstrap";
const StructureContainer = (props) => {

    const [currentStep, setCurrentStep] = useState("department");
    const [optionalData,setOptionalData] = useState();

    const handleNextStep = (step, _data) => {
        setCurrentStep(step);
        if (_data) {
            setOptionalData(_data);
        }
    };
    return (
        <Row>
            <Col>
                {currentStep == "department" ? (
                    <Department
                        handleNextStep={handleNextStep}
                    />
                ) : currentStep == "year" ? (
                    <Year
                        handleNextStep={handleNextStep}
                        data={optionalData}
                    />) : 
                    currentStep == "subject" ? (
                        <Subject
                            handleNextStep={handleNextStep}
                        />) : 
                    null}
            </Col>
        </Row>

    )

}


export default StructureContainer;