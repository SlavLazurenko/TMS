import React, {useState} from "react"
import "../css/SignUp.css";
import axios from "axios";

const SignUp = props => {

    

    const initialUserState = {

        email: "",
        username: "",
        password: "",
        confirmpassword: ""
    }

    const [user, setUser] = useState(initialUserState);

    const handleInputChange = event => {

        const{name, value} = event.target;
        setUser({...user, [name]: value});

    }

    const signup = () => {

        axios.post('/registerUser', user)
        .then(res => {console.log(res.data)})
        // props.signup(user)
        // props.history.push('/')
        
    }

    return (

        <div className="form-card-background">
            <div className="form-card">
            <h1>Sign Up</h1>  
                 <form className="signup-form">
                    <input
                    className="signup-input"  
                    placeholder="Email"
                    id= "email"
                    value= {user.email}
                    onChange={handleInputChange}
                    name="email"></input>

                    <input
                    className="signup-input"
                    placeholder="Username"
                    id= "username"
                    value= {user.username}
                    onChange={handleInputChange}
                    name="username"></input>

                    <input 
                    className="signup-input"
                    type="password" 
                    placeholder="Password"
                    id= "password"
                    value= {user.password}
                    onChange={handleInputChange}
                    name="password"></input>

                    <input
                    className="signup-input"
                    type="password"  
                    placeholder="Confirm Password"
                    id= "confirmpassword"
                    value= {user.confirmpassword}
                    onChange={handleInputChange}
                    name="confirmpassword"></input>

                    <input
                    className="signup-submit" 
                    type="submit"
                    value="Signup"
                    onClick={signup}/>
                </form>
           
            </div>
        </div>


    )

}

export default SignUp;