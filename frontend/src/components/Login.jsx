import React, { useState } from "react"
import "../css/Login.css";
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

function Login(props) {

    
    const initialUserState = {

        username: "",
        password: "",

    }

    const [user, setUser] = useState(initialUserState);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }

    const login = (e) => {
        e.preventDefault()

        axios.post("http://localhost:3001/userLogin", user)
        .then(res => {
            console.log(`${res.status} ${res.statusText}: ${res.data}`);
            cookies.set('access_token', res.data)
            let result = cookies.get('access_token')
            props.setToken(result)
            props.history.push('/')
        })
        .catch(err => {
            
            alert(err.response.data)
            console.log(err);

          });
    }

    return (

        <div className="form-card-background">
             <div className="form-card">
             <h1>Login</h1>  
                  <form className="login-form">
                     <input
                     className="login-input" 
                     placeholder="Username" 
                     id= "username"
                     value= {user.username}
                     onChange={handleInputChange}
                     name="username" ></input>

                     <input
                     className="login-input"
                     type="password" 
                     placeholder="Password"
                     id= "password"
                     value= {user.password}
                     onChange={handleInputChange}
                     name="password"></input>

                     <input
                     className="login-submit" 
                     type="button" 
                     value="Login"
                     onClick={login}/>

                     <div className="extra-options">
                         <p className="left"><a href="/signup">Sign-up</a></p>
                         <p className="right"><a href="/login">Forgot password?</a></p>
                     </div>
                 </form>
           
             </div>
         </div>
    )
}



export default Login;