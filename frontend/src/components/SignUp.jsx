import React, {useState} from "react"
import "../css/SignUp.css";

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

        props.signup(user)
        props.history.push("/");
    }

    return (

        <div className="form-card-background">
            <div className="form-card">
            <h1>Sign Up</h1>  
                 <form>
                    <input  placeholder="Email"
                    id= "email"
                    require value= {user.email}
                    onChange={handleInputChange}
                    name="email"></input>

                    <input  placeholder="Username"
                    id= "username"
                    require value= {user.username}
                    onChange={handleInputChange}
                    name="username"></input>

                    <input  placeholder="Password"
                    id= "password"
                    require value= {user.password}
                    onChange={handleInputChange}
                    name="password"></input>

                    <input  placeholder="Confirm Password"
                    id= "confirmpassword"
                    require value= {user.confirmpassword}
                    onChange={handleInputChange}
                    name="confirmpassword"></input>

                    <input 
                    type="submit"
                    value="Signup"
                    onClick={signup}/>
                </form>
           
            </div>
        </div>


    )

}

export default SignUp;