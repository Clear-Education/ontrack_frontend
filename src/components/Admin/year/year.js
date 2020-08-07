import TitlePage from "../../commons/title_page/title_page";

const Year = (props) => {

    return (
        <>
            <TitlePage title="Años" />
            <button onClick={()=>props.handleNextStep('subject')}>Materias</button>
        </>
    )

}


export default Year;