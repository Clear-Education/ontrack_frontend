import { ListItem, Checkbox, ListItemText, List } from "@material-ui/core";
import { useState, useEffect } from "react";
import styles from './styles.module.scss';

const INITIAL = [{id:1,descripcion:'uno',complete:true},{id:2,descripcion:'dos',complete:false},{id:3,descripcion:'tres',complete:true}];

const GoalsViewer = () =>{

    const [loading,setLoading] = useState(true);
    const [goals,setGoals] = useState(INITIAL)

    useEffect(()=>{
      setLoading(false);
    },[])

    const handleCheck = (idGoal)=>{
      let goalsCopy = [...goals];
      goalsCopy.map((goal)=>{
        if(goal.id === idGoal){
          goal.complete = !goal.complete;
        }
      })
      setGoals(goalsCopy);
    }

    return(
      loading ? null :
        <List>
        {goals.map((goal)=>{
            const labelId = goal.descripcion;
            return(
                <ListItem key={goal.id}>
                  <Checkbox
                    checked={goal.complete}
                    onClick={()=>{handleCheck(goal.id)}}
                  />
                  <ListItemText id={labelId} primary={`Line item ${labelId}`} className={goal.complete ? styles.complete : ''}/>
                </ListItem>
            )
        })
    }
        </List>
    )
}

export default GoalsViewer;