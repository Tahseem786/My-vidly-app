import React from "react";
import { Route, Redirect} from "react-router-dom";
import {getjwt} from "./authService"

const protectedRoute = ({path, component:Component, render, ...rest }) => {
    return (
        <Route 
            {...rest}
            path="/login"
            render={props=>{
                if(!getjwt()) <Redirect to={{
                    pathname:"/login",
                    state:{from:props.location}
                }}/>;
                return Component ? <Component {...props} /> : render(props);
            }}
        />
    );
}
 
export default protectedRoute;