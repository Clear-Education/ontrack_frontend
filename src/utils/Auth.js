
import axios from 'axios'
import Config from './Config'
import { loadState } from '../../redux/immutableState'


const Auth = {

async login({email,password}){
    let data = {
        email: email,
        password: password
    }
    return axios.post(`${Config.api_url}/users/login`,data).then((json)=>{
       if(json.header === 200){
           let result = {
               success: true,
               token: json.token
           }
           return result
       }
    })


},




checkAuth() {
    const state = loadState();
    return state;
  },

  
}

export default Auth;