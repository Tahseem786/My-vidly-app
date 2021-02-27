import React, {useEffect, useState} from "react";
import Demo from "./Demo";
import jwtdecode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.css";
import {Route, Switch, Redirect} from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import Nav from "./Nav";
import Register from "./register";
import NotFound from "./NotFound";
import Movie from "./Movie";
import {getjwt} from "./authService";
// import protectedRoute from "./protectedRoute";

const App = ({location}) => {
  const [jwt, Ujwt] = useState()
  useEffect(()=>{
    try{
      const Jwt = getjwt()
      const user = jwtdecode(Jwt)
      Ujwt(user)
    }catch(ex){}
  },[])
  return (
    <>
    <Nav user = {jwt}/> 
    <div style={{marginTop:"30px"}}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/notfound" component={NotFound} />
        <Route exact path="/" render={props=><Demo {...props} user={jwt} />} />
        <Route path="/movie/:id?" render={props=>{
          if(!jwt) return <Redirect to="/login"/>
          return <Movie {...props} / >;
        }} />
        <Redirect to="/notfound" />
      </Switch>
    </div>
    </>
  );
};

export default App;
