import React from "react"
import "../css/SignUp.css";
import { useState } from "react";
import { useForm } from "react-hook-form";


function SignUpCard() { 

    const { register, handleSubmit } = useForm();
    const [result, setResult] = useState("");
    const onSubmit = (data) => setResult(JSON.stringify(data));


    return (

        <div className="form-card-background">
            <div className="form-card">
            <h1>Sign Up</h1>  
                 <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("email")} placeholder="Email"></input>
                    <input {...register("username")} placeholder="Username"></input>
                    <input {...register("password")} placeholder="Password"></input>
                    <input {...register("confirmedpass")} placeholder="Confirm Password"></input>
                    <input type="submit" value="Signup"/>
                    <p>Result: {result}</p>
                </form>
           
            </div>
        </div>
        

    )

}

function SignUp() {

    return(
        
        <div className="signup">
            <SignUpCard/>
        </div>
    );
}

export default SignUp;