import styles from './SideBar.module.css';
import Link from 'next/link';
import PeopleIcon from '@material-ui/icons/People';

export default function SideBar() {
    return (
        <div className={styles.side_bar}>
            <div className={styles.img_container}>
                <img src="./OnTrack.svg" className={styles.img_header}></img>
            </div>
            <NavItem></NavItem>
        </div>
    )
}

const NavItem = () => {
    return (
        <div className={styles.container_icon_link}>
            <PeopleIcon />
            <Link href="/users">
                <a className={styles.nav_link}>Cuentas de Usuario</a>
            </Link>
        </div>
    )
}