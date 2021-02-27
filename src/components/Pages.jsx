import React from "react";
import _ from "lodash";

const Pages = (props) => {
  const {currentPage, onpageChange, count, pageSize} = props;
  const pageCounte = count/pageSize;
  if (pageCounte<=1) return null;
  const pages = _.range(1, pageCounte+1)
  return (
    <>
      <nav>
        <ul className="pagination"> 
        {
          pages.map(page=>(
            <li style={{cursor:"pointer"}} key={page} className={currentPage===page?"page-item active":"page-item"}>
            <button onClick={()=>onpageChange(page)}  className="page-link">{page}</button>
            </li>
          ))
        }
        </ul>
      </nav>
    </>
  );
};
export default Pages;
