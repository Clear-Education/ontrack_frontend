import { Row, Col } from "react-bootstrap";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import styles from './styles.module.scss';
import { IconButton } from "@material-ui/core";


const NewPost = ({handleSubmitData}) => {
    return (
        <Row lg={12} md={12} sm={12} xs={12} className={styles.container}>
            <Col lg={12} md={12} sm={12} xs={12}>
                    <FormControl variant="outlined">
                        <TextField
                        multiline
                        label={"Publica alguna novedad"}
                        InputLabelProps={{style:{color:'var(--black) !important'}}}
                        rowsMax={3}
                        />
                    </FormControl>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12} className={styles.bottom_container}>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <SendIcon/>
                    </IconButton>
            </Col>
        </Row>
    )
}

export default NewPost;