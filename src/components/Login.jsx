import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import "../index.css";
import Joi from "joi-browser";
import {login} from "./authService";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getjwt} from "./authService";


const Login = (props) => {
  const [loginData, UloginData] = useState({username:"", password:""})
  const [error, Uerror] = useState({})
  
  const Schema={
    username:Joi.string().required(),
    password:Joi.string().required()
  }
  const Validate= ()=>{
    const result = Joi.validate(loginData, Schema, {abortEarly:false})
    if(!result.error) return null;
    const errors = {}
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  }


  const handleSubmit = async(e) =>{
    e.preventDefault();
     const errors = Validate();
     Uerror(errors)
     if(error) return;
     //surver call
     try{
       const {data} = await login(loginData.username, loginData.password)
       localStorage.setItem("token",data)
       window.location = "/";
     }catch(ex){
       if(ex.response && ex.response.status === 400){
        //  toast.error(ex.response.data)
        const errors = {...error}
        errors.username = ex.response.data
        Uerror(errors)
       }
     }
      
    }
    const validateProperty = ({name, value}) =>{
      const obj = {[name] : value}
      const schema = {[name] : Schema[name]}
      const {error} = Joi.validate(obj, schema);
      return error ? error.details[0].message : null;
    }
  const handleChange = ({currentTarget:input}) =>{
    const errorMessage = validateProperty(input);
    if (errorMessage)  error[input.name] = errorMessage;
    else delete error[input.name];

    const account = {...loginData}
    account[input.name] =  input.value;
    UloginData(account)
  }
  if(getjwt()) return <Redirect to="/" />
  return (
    <> 
    
    <ToastContainer />
        
        <form id="form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                    autoFocus 
                     type="text"
                     value = {loginData.username}
                     onChange= {handleChange}
                     name = "username" 
                     className="form-control"
                     id="uername" 
                     placeholder="Enter username"
                     />
                </div>
                {error && error.username && <div style={{marginTop:"0px"}} className="alert alert-danger ">{error.username}</div>}
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input 
                    type="password"
                    value = {loginData.password}
                    onChange= {handleChange}
                    name = "password" 
                    className="form-control" 
                    id="Password" 
                    placeholder="Password" 
                    />
                </div>
                {error && error.password && <div style={{marginTop:"0px"}}  className="alert alert-danger ">{error.password}</div>}
                <button disabled={Validate()} type="submit" className="btn btn-success">Login</button>
            </form>
            <hr style={{width:"15%", margin:"auto", marginTop:"20px"}} />
            
    </>
  );
};

export default Login;
