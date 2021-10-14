import React, { Component } from "react"
import "../css/Login.css";
import { useState } from "react";
import { useForm } from "react-hook-form";


function LoginCard() { 

    const { register, handleSubmit } = useForm();
    const [result, setResult] = useState("");
    const onSubmit = (data) => setResult(JSON.stringify(data));


    return (

        <div className="form-card-background">
            <div className="form-card">
            <h1>Login</h1>  
                 <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("username")} placeholder="Username"></input>
                    <input {...register("password")} placeholder="Password"></input>
                    <input type="submit" value="Login"/>
                    <div className="extra-options">
                        <p className="left"><a href="/login">Sign-up</a></p>
                        <p className="right"><a href="/login">Forgot password?</a></p>
                    </div>
                    <p>Result: {result}</p>
                </form>
           
            </div>
        </div>
        

    )

}

function Login() {

    return(
        
        <div className="login">
            <LoginCard></LoginCard>
        </div>
    );
}

export default Login;