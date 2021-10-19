import React, { useState } from "react"
import "../css/Login.css";

const Login = props => {


    const initialUserState = {

        username: "",
        password: "",

    }

    const [user, setUser] = useState(initialUserState);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }

    const login = () => {

        props.login(user)
        props.history.push("/");
    }

    return (

        <div className="form-card-background">
             <div className="form-card">
             <h1>Login</h1>  
                  <form>
                     <input 
                     placeholder="Username" 
                     id= "username"
                     require value= {user.username}
                     onChange={handleInputChange}
                     name="username" ></input>

                     <input placeholder="Password"
                     id= "password"
                     require value= {user.password}
                     onChange={handleInputChange}
                     name="password"></input>

                     <input 
                     type="submit" 
                     value="Login"
                     onClick={login}/>

                     <div className="extra-options">
                         <p className="left"><a href="/login">Sign-up</a></p>
                         <p className="right"><a href="/login">Forgot password?</a></p>
                     </div>
                 </form>
           
             </div>
         </div>
    )
}

export default Login;