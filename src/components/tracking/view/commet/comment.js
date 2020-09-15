import { Row, Col } from "react-bootstrap";
import styles from './styles.module.scss';
import { Avatar, IconButton, Collapse, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from "react";

export const Comment = () => {

    return (
        <Row lg={12} md={12} sm={12} xs={12} className={styles.container}>
            <Col lg={1} md={1} sm={1} xs={1}>
                <Avatar />
            </Col>
            <Col lg={11} md={11} sm={11} xs={11} className={styles.header_container}>
                <span className={styles.highlight}>Mariano López</span> comentó {" "}
                <span className={styles.dot}></span>
                <span className={styles.post_date}> Ayer : </span>
                <div className={styles.more_options}>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
                <Row lg={12} md={12} sm={12} xs={12} className={styles.content_container}>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <span className={styles.comment_body}>"He visto avances significativos en el comportamiento del alumno"</span>
                        <span className={styles.attach_label}>Ver archivos adjuntos</span>
                    </Col>
                </Row>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12} className={styles.comments_actions}>
                <span className={styles.comments_label}>Ver hilo</span>
                <IconButton title="Responder">
                    <QuestionAnswerIcon/>
                </IconButton>
            </Col>
        </Row>
    )
}

export default Comment;