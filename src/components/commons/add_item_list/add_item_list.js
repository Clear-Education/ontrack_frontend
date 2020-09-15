import { FormLabel, TextField, FormControl, FormHelperText, IconButton } from "@material-ui/core";
import Delete from '@material-ui/icons/Delete';
import { Row, Col } from "react-bootstrap";
import styles from './styles.module.scss';
const { useState, useEffect } = require("react")

const AddItemList = ({ labelText, handleList, previousItems }) => {

    const [listItems, setListItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [validateItem, setValidateItem] = useState(false);

    useEffect(()=>{
        if(previousItems.length > 0){
            setListItems(previousItems);
        }
    },[])

    const handleChange = (event) => {
        setNewItem(event.target.value);
        handleValidation(event.target.value);
    }

    const handleAddItem = (event) => {
        if (event.key === 'Enter') {
            const VALID_DATA = handleValidation(newItem);
            if (!VALID_DATA) {
                let newList = [...listItems];
                newList.push(newItem);
                setListItems(newList);
                handleList(newList);
                setNewItem("");
            }
        }
    }

    const handleDeleteItem = (index) => {
        let newList = [...listItems];
        newList.splice(index,1);
        setListItems(newList);
        handleList(newList);
    }

    const handleValidation = (value) => {
        const VALIDATION = !value.trim().length > 0;
        setValidateItem(VALIDATION);
        return VALIDATION;
    }

    return (
        <>
            <Row lg={12} md={12} sm={12} xs={12} style={{ margin: 'auto' }}>
                {
                    listItems.map((item, index) => {
                        return (
                            <Col lg={12} md={12} sm={12} xs={12} className={styles.item_container} key={index}>
                                {item}
                                <IconButton onClick={() => handleDeleteItem(index)}>
                                    <Delete />
                                </IconButton>
                            </Col>

                        )
                    })
                }
            </Row>
            <FormControl variant="outlined">
                <FormLabel className="left" component="legend">{labelText} presionando ENTER</FormLabel>
                <TextField
                    id="newItem"
                    name="newItem"
                    variant="outlined"
                    value={newItem}
                    onChange={handleChange}
                    onKeyPress={handleAddItem}
                    required
                    style={{
                        padding: '0'
                    }}
                />
            </FormControl >
            {
                validateItem && (
                    <FormHelperText
                        className="helper-text"
                        style={{ color: "rgb(182, 60, 47)" }}
                    >
                        Este campo no puede ser vacío
                    </FormHelperText>
                )
            }
        </>
    )
}

export default AddItemList;