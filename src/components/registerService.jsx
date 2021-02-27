import http from "./httpService";

// const apiEndPOint = "http://localhost:3900/api/users"
const apiEndpoint = "https://serene-lowlands-01376.herokuapp.com/api/users"

export function register(user){
    return http.post(apiEndpoint,{
        email:user.username,
        password:user.password,
        name:user.fname
    })
}