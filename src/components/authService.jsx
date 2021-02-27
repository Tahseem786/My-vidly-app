import http from "./httpService";

http.setjwt(getjwt())

// const apiEndpoint = "http://localhost:3900/api/auth";
const apiEndpoint = "https://serene-lowlands-01376.herokuapp.com/api/auth"

export function login(email, password){
   return http.post(apiEndpoint, {email, password});
}

export function getjwt(){
   return localStorage.getItem("token")
}

