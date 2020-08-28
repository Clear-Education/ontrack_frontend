import styles from './go_back_button.module.css'
const GoBackButton = (props) => {


    const handleClick = (e) => {
        e.preventDefault();
        props.action();
    }
    return (
        <button className={`${styles.go_back_button} ontrack_btn`} onClick={(e) => handleClick(e)}>
            Volver
        </button>
    )
}

export default GoBackButton;