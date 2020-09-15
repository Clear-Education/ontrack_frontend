import { Row, Col } from "react-bootstrap";
import styles from './styles.module.scss';
import { Avatar, IconButton, Collapse, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from "react";
import Comment from "../commet/comment";

const Post = () => {

    const [openComments, setOpenComments] = useState(false);

    return (
        <Row lg={12} md={12} sm={12} xs={12} className={styles.container}>
            <Col lg={1} md={1} sm={1} xs={1}>
                <Avatar />
            </Col>
            <Col lg={11} md={11} sm={11} xs={11} className={styles.header_container}>
                <span className={styles.highlight}>Mariano López</span> publicó en
                <span className={styles.highlight}> seguimiento de francisco perez </span>
                <span className={styles.dot}></span>
                <span className={styles.post_date}> Ayer : </span>
                <div className={styles.more_options}>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
                <Row lg={12} md={12} sm={12} xs={12} className={styles.content_container}>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        "He visto avances significativos en el comportamiento del alumno"
                        <div style={{ overflow: 'auto', display: 'flex' }}>
                            <img className={styles.post_image} src="https://st.depositphotos.com/1060916/4905/i/950/depositphotos_49058819-stock-photo-3d-person-and-checklist.jpg" />
                            <img className={styles.post_image} src="https://st.depositphotos.com/1060916/4905/i/950/depositphotos_49058819-stock-photo-3d-person-and-checklist.jpg" />
                            <img className={styles.post_image} src="https://st.depositphotos.com/1060916/4905/i/950/depositphotos_49058819-stock-photo-3d-person-and-checklist.jpg" />
                            <img className={styles.post_image} src="https://st.depositphotos.com/1060916/4905/i/950/depositphotos_49058819-stock-photo-3d-person-and-checklist.jpg" />
                            <img className={styles.post_image} src="https://st.depositphotos.com/1060916/4905/i/950/depositphotos_49058819-stock-photo-3d-person-and-checklist.jpg" />
                            <img className={styles.post_image} src="https://st.depositphotos.com/1060916/4905/i/950/depositphotos_49058819-stock-photo-3d-person-and-checklist.jpg" />
                            <img className={styles.post_image} src="https://st.depositphotos.com/1060916/4905/i/950/depositphotos_49058819-stock-photo-3d-person-and-checklist.jpg" />
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12} className={styles.comments_actions}>
                <span className={styles.comments_label} onClick={() => setOpenComments(!openComments)}>{openComments ? 'Ocultar comentarios' : 'Ver 5 comentarios'}</span>
                <IconButton title="Agrega un comentario">
                    <ChatBubbleOutlineIcon />
                </IconButton>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12} className={styles.comments_container}>
                <Collapse in={openComments} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <div className={styles.comment_container}>
                            <Comment />
                        </div>
                    </List>
                </Collapse>
            </Col>
        </Row>
    )
}

export default Post;