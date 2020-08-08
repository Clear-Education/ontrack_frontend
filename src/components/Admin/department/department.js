import TitlePage from "../../commons/title_page/title_page";

const Department = (props) => {

    return(
      <>
       <TitlePage title="Especialidades" />

       <button onClick={()=>props.handleNextStep('year')}>Años</button>
      </>
    )

}


export default Department;