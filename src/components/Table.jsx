import React from "react";
import { Link } from "react-router-dom";
import {getjwt} from "../components/authService";


const Table = (props) => {
  const {onDelete, Img, AllMovies, onSort, onChange} = props;
  return (
    <>
    <table className= "table table-sm">
      <thead >
        <tr id="head" className="sing" >
          <th scope="col">#</th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("title")}
            scope="col"
          >Title
          </th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("genre[name]")}
            scope="col"
          >Genre
          </th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("numberInStock")}
            scope="col"
          >Stock</th>
          <th
            style={{ cursor: "pointer"}}
            onClick={() => onSort("dailyRentalRate" )}
            scope="col"
          >Rate
          </th>
          <th scope="col" id="sing"><img style={{ width:"12px"}} src={Img} alt="sing" /></th>
        </tr>
      </thead>
      <tbody>
        {AllMovies.map((movie) => (
          <tr key={movie._id}>
            <th scope="row">{AllMovies.indexOf(movie) + 1}</th>
            <td>
              <img
                onClick={() => onChange(movie)}
                style={{ height: "20px", marginLeft: "5px" }}
                src={movie.liked}
                alt="like"
              />
              <Link exact to={`/movie/${movie._id}`}>{movie.title}</Link>
              
            </td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
            {
              (getjwt()) &&
              <button onClick={() => onDelete(movie)} className="btn btn-danger">
                Delete
              </button>
            }
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    </>
    
  );
};

export default Table;
