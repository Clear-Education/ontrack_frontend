import { AppBar, Toolbar, IconButton, MenuIcon, Typography, Button, Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';

import styles from './Header.module.css';

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar className={styles.header}>
                {/* <div className={styles.img_header}>
                    <img src="./OnTrack.svg"></img>
                </div> */}
                <div className={styles.container_icons_header}>
                    <IconButton aria-label="show 17 new notifications">
                        <Badge badgeContent={17} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton>
                        <AccountCircle />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}