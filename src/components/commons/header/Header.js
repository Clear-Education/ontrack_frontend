// Import dependencias
import { Row, Col } from "react-bootstrap";

// Import componentes
import styles from "./header.module.css";
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { IconButton, useTheme, useMediaQuery, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Collapse from '@material-ui/core/Collapse';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useState } from "react";

const Header = () => {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.up(767));
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }

  return (
    <div id={styles.header_container}>
      <Row lg={12} md={12} sm={12} xs={12}>
        <Col className="left" lg={2} md={2} sm={2} xs={2}>
          <div className={styles.logo_container}>
            <img src={fullScreen ? `/OnTrack.svg` : `/OnTrack_mini.svg`} id={fullScreen ? styles.logo : styles.mini_logo} />
          </div>
        </Col>
        <Col className="right" lg={10} md={10} sm={10} xs={10}>
          <div className={styles.icons_container}>
            <Row>
              <Col>
                <IconButton>
                  <NotificationsIcon />
                </IconButton>
              </Col>
              <Col>
                <IconButton onClick={handleOpen}>
                  <PersonIcon />
                  {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </IconButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <div className={styles.collapse_container}>
                    <span className={styles.collapse_item}>
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </span>
                    <span className={styles.collapse_item}>
                      <IconButton>
                        <ExitToAppIcon />
                      </IconButton>
                    </span>
                  </div>
                </Collapse>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
