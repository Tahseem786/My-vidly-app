import React, {useState, useEffect} from "react";
import "../index.css";
import Joi from "joi-browser";
import http from "./httpService";
import newMoviData from "../newMovieData";
import newGenreData from "../newGenreData";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Movie = ({history, match}) => { 
  const [genreData,UngenreData] = useState([{_id: ""},{_id: ""}, {_id: ""},{ _id: ""}])
  const [moviData, UmovieData] = useState();
  useEffect(()=>{
    async function getData(){
      const {data:Mdata} = await http.get(newMoviData)
      const {data:Gdata} = await http.get(newGenreData)
      UmovieData(Mdata)
      UngenreData(Gdata)
    }
    getData()
  },[])
  const [registerData, UregisterData] = useState({})
  const [error, Uerror] = useState({})
  
  const handleAddmovie = ()=>{
    const index = match.params.id
    const Movie = moviData.filter(e=>e._id === index)
    const Data = {
    title:Movie[0].title,
    genreId:Movie[0].genre._id,
    numberInStock:Movie[0].numberInStock,
    dailyRentalRate:Movie[0].dailyRentalRate
    } 
    UregisterData(Data)
    
  }
  const Schema={
    title:Joi.string().min(5).max(50).required(),
    genreId:Joi.string().required(),
    numberInStock:Joi.number().min(0).max(10).required(),
    dailyRentalRate:Joi.number().required()
  }
  const Validate= ()=>{
    const result = Joi.validate(registerData, Schema, {abortEarly:false})
    if(!result.error) return null;
    const errors = {}
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
     const errors = Validate();
     Uerror(errors)
     if(error) return;
     //surver call
     if(match.params.id){
      const index = match.params.id
      const Movie = moviData.filter(e=>e._id === index)
      const ind = moviData.indexOf(Movie[0])
      let selecteMovie = moviData[ind]
      selecteMovie = {...registerData}
      await http.put(newMoviData + "/" + index, selecteMovie)
      history.push("/")
     }else{
      const newData = {...registerData}
      Uerror({})
      const {data:posts} = await http.post(newMoviData, newData)
      const newMovie = [posts, ...moviData]
      UmovieData(newMovie)
      history.push("/")
     }
    }
    const validateProperty = ({name, value}) =>{
      const obj = {[name] : value}
      const schema = {[name] : Schema[name]}
      const {error} = Joi.validate(obj, schema);
      return error ? error.details[0].message : null;
    }
  const handleChange = ({currentTarget:input}) =>{
    if (input.name === "numberInStock" || input.name === "dailyRentalRate"){
      input.value =  parseInt(input.value);
    }
    const errorMessage = validateProperty(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];
    const account = {...registerData}
    account[input.name] =  input.value;
    UregisterData(account)
  }

  return (
    <> <ToastContainer />
        <h1>{match.params.id && moviData ? <span><h1>Movie id no:{match.params.id }</h1><button onClick= {handleAddmovie} className="btn btn-success">Add Selected Movie Data</button></span>: <h1>Adding Movie</h1>}</h1>
        <form id="form" onSubmit={handleSubmit}>
                <h1>Movie</h1>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                    autoFocus 
                     type="text"
                     value = {registerData.title}
                     onChange= {handleChange}
                     name = "title" 
                     className="form-control"
                     id="title" 
                     placeholder="title"
                     />
                </div>
                {error && error.title && <div style={{fontSize:"13px"}} className="alert alert-danger p-1">{error.title}</div>}
                <div  className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <select value={registerData.genreId} onChange= {handleChange} className="form-control" name="genreId" id="genre">
                        <option value={genreData[0]._id}>{genreData[0].name}</option>
                        <option value={genreData[1]._id}>{genreData[1].name}</option>
                        <option value={genreData[2]._id}>{genreData[2].name}</option>
                        <option value={genreData[3]._id}>{genreData[3].name}</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="numberInStock">Stock</label>
                    <input 
                    type="number"
                    value = {registerData.numberInStock}
                    onChange= {handleChange}
                    name = "numberInStock" 
                    className="form-control" 
                    id="numberInStock" 
                    placeholder="stock" 
                    />
                </div>
                {error && error.numberInStock &&  <div style={{fontSize:"13px"}} className="alert alert-danger p-1">{error.numberInStock}</div>}
                <div className="form-group">
                    <label htmlFor="dailyRentalRate">Rate</label>
                    <input 
                    type="number"
                    value = {registerData.dailyRentalRate}
                    onChange= {handleChange}
                    name = "dailyRentalRate" 
                    className="form-control" 
                    id="dailyRentalRate" 
                    placeholder="rate" 
                    />
                </div>
                {error && error.dailyRentalRate &&  <div style={{fontSize:"13px"}} className="alert alert-danger p-1">{error.dailyRentalRate}</div>}
                <button type="submit" className="btn btn-success">Update</button>
            </form>     
    </>
  );
};

export default Movie;
