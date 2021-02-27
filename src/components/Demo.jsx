import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import heart from "../images/heart.png";
import like1 from "../images/like1.png";
import down from "../images/down.png";
import upper from "../images/upper.png";
import loading from "../images/loading.gif"
import Pages from "./Pages";
import { Paginate } from "./Paginate";
import Gener from "./Gener";
import "../index.css";
import _ from "lodash";
import Table from "./Table";
import {Link} from "react-router-dom";
import newMoviData from "../newMovieData";
import http from "./httpService";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Demo = (props) => {
  
  const pageSize = 5;
  const [current, Ucurrent] = useState(1);
  const [Gcurrent, Ugurrent] = useState("All Genre");
  const [Query, UQuery] = useState("");
  const [movies, Umovies] = useState([]);
  const [movieData, UmovieData] = useState([]);
  const [load, Uload] = useState()
  const [sortC, UsortC] = useState({path:"title", order:"asc", sing:down, display:"none"});
  const [img, Uimg] = useState(heart)
   
  useEffect(()=>{
    async function getData(){
      const {data} = await http.get(newMoviData)
      data.map((item)=>{
        return item["liked"]=heart;
      })
      UmovieData(data)
      Umovies(data)
      Uload(data)
    }
    getData()
  },[])

  const changeHandle = (M) => {
    let ind = movies.indexOf(M);
    const sample = [...movies];
    if (img === heart){
      Uimg(like1)
      sample[ind]["liked"]=img;
    }
    if (img === like1){
      console.log("yed")
      Uimg(heart)
      sample[ind]["liked"]=img;
    }
    Umovies(sample)
  };

  const deleteHandle = async(D) => {
    let sample = [...movies];
    let Sample = sample.filter((m) => m._id !== D._id);
    Umovies(Sample);
    try{
      await http.delete(newMoviData + "/" + D._id)
    }catch (ex) {
      if ( ex.response && ex.response.status >= 403){
        toast.error("Only admin can delete the post!!! ");
      }
      else if (ex.response && ex.response.status >= 400 && ex.response.status <= 500){
        toast.error("this post hase been already deleted!!");
      }
      Umovies(sample)
    }
    
  };

  const pageChange = (page) => {
    Ucurrent(page);
  };
 
  let generSample = [];
  movieData.filter((item) =>
    generSample.includes(item.genre.name) ? null : generSample.push(item.genre.name)
  );

  const onItemchange = (genre) => {
    Ugurrent(genre);
    Ucurrent(1);
    UQuery("")
    const sampleGenre = movieData.filter((item) => item.genre.name === genre);
    Umovies(sampleGenre);
  };
  const onItemchangeall = () => {
    Umovies(movieData);
    UQuery("")
    Ugurrent("All Genre");
  };

 const handleQuery= (e) =>{
        const query = e.currentTarget.value
        UQuery(query)
        Ugurrent("");
        Ucurrent(1);
        if (query===""){
          Umovies(movieData);
        }else{
        const sample = [...movies]
        const sorted = sample.filter(item=> item.title.toLowerCase().startsWith(query))
        Umovies(sorted)
        }
 }

  
  const sortHandle = (path)=>{
    if (sortC.order==='asc'){
      UsortC({path:path, order:'desc', sing:upper})
    }else{
      UsortC({path:path, order:'asc', sing:down})
    }
    
  }
  const sorted =  _.orderBy(movies, [sortC.path], [sortC.order] )
  const allMovies = Paginate(sorted, current, pageSize);
  return (
    <>
      <ToastContainer />
      <div id="status">       
        {movies.length > 0 ? (<h5 >Search Result: &nbsp;{movies.length} Movies Found!</h5>) : (<h5 style={{color:"red"}} >No Movies in Search Filter!</h5>)}
        </div>
      <div style={{
        display:"flex",
        flexDirection:"row",
        flexWrap: "wrap",
        justifyContent:"space-between"}} id = "container">
        <div id="Gener" style={{ width: "25%", margin: "10px" }}>
          <Gener
            items={generSample}
            currentItem={Gcurrent}
            onSelect={onItemchange}
            onSelectall={onItemchangeall}
          />
        </div>
        <div id="table" style={{ width: "65%", margin: "5px", marginRight: "30px" }} > 
        <div>
          {props.user && <button className="btn btn-primary m-2"><Link style={{color:"white", textDecoration:"none"}} to="/movie">New Movie</Link></button>}
          <input style={{marginBottom:"2px"}} type="text" value={Query} onChange={handleQuery} placeholder="Search..." className="form-control" />
         {(!load)?<img style={{marginLeft:"30%", width:"200px"}}  src={loading} alt="loading Img" />:
              <Table
              Img = {sortC.sing}
              onSort = {sortHandle}
              AllMovies = {allMovies}
              onDelete = {deleteHandle}
              onChange = {changeHandle}
              user={props.user}
                />
         }
          
          <Pages
            count={movies.length}
            pageSize={pageSize}
            onpageChange={pageChange}
            currentPage={current}
          />
          </div>
        </div>
        </div>
    </>
  );
};
export default Demo;

