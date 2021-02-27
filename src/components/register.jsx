import React, {useState} from "react";
import "../index.css";
import Joi from "joi-browser";
import * as registerUser from "./registerService";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = ({history}) => {
  const [registerData, UregisterData] = useState({username:"", password:"", fname:""})
  const [error, Uerror] = useState({})
  
  const Schema={
    username:Joi.string().required().email(),
    password:Joi.string().required().min(5),
    fname:Joi.string().required()
  }
  const Validate= ()=>{
    const result = Joi.validate(registerData, Schema, {abortEarly:false})
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
     Uerror({})
     try{
      const response = await registerUser.register(registerData)
      localStorage.setItem("token", response.headers["x-auth-token"])
      console.log(response)
      window.location = "/";
     }catch(ex){
       if (ex.response && ex.response.status === 400){
         toast.error(ex.response.data)
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

    const account = {...registerData}
    account[input.name] =  input.value;
    UregisterData(account)
  }

  return (
    <> 
        <ToastContainer />
        
        <form id="form" onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="form-group">
                    <label htmlFor="username ">Username</label>
                    <input
                    autoFocus 
                     type="text"
                     value = {registerData.username}
                     onChange= {handleChange}
                     name = "username" 
                     className="form-control"
                     id="uername" 
                     placeholder="Enter username"
                     />
                </div>
                {error && error.username && <div style={{fontSize:"13px"}} className="alert alert-danger p-1">{error.username}</div>}
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input 
                    type="password"
                    value = {registerData.password}
                    onChange= {handleChange}
                    name = "password" 
                    className="form-control" 
                    id="Password" 
                    placeholder="Password" 
                    />
                </div>
                {error && error.password && <div style={{fontSize:"13px"}} className="alert alert-danger p-1">{error.password}</div>}
                <div className="form-group">
                    <label htmlFor="fname">Name</label>
                    <input 
                    type="text"
                    value = {registerData.fname}
                    onChange= {handleChange}
                    name = "fname" 
                    className="form-control" 
                    id="fname" 
                    placeholder="name" 
                    />
                </div>
                {error && error.fname &&  <div style={{fontSize:"13px"}} className="alert alert-danger p-1">{error.fname}</div>}
                
                <button disabled={Validate()} type="submit" className="btn btn-success">Register</button>
            </form>
            
    </>
  );
};

export default Register;
