
import axios from 'axios'
import Config from './Config'


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
}

export default Auth;