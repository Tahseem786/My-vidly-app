import axios from "axios";
import { toast} from "react-toastify";

axios.interceptors.response.use(null, error=>{
  const condition = error.response && error.response.status >= 400 && error.response.status < 500
  if (!condition){
    toast.error("Unexpected Errror Occurred!!")
  }
  return Promise.reject(error)    
})
export function setjwt(jwt){
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const Axios = {
    post:axios.post,
    get:axios.get,
    put:axios.put,
    delete:axios.delete,
    setjwt
};
export default Axios;