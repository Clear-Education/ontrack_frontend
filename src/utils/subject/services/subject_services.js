import { getSubjectsCrud } from "../cruds/subject_cruds";
import Alert from "react-s-alert";


export async function getSubjectsService(token,year_id){
    getSubjectsCrud(token,year_id).then((result)=>{
        if (result.success) {
            
          } else {
            result.result.forEach((element) => {
              Alert.error(element.message, {
                position: "bottom",
                effect: "stackslide",
              });
            });
          }
          return result;
    })

}