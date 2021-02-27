import React from "react";

const Genre = (props)=>{ 
    return (
        <>
            <ul className="list-group">
            <li style={{cursor:"pointer"}} onClick={props.onSelectall} className={"All Genre" === props.currentItem?"list-group-item list-group-item-action active":"list-group-item list-group-item-action"}>All Genre</li>
            {
                props.items.map(item=>(
                    <li style={{cursor:"pointer"}} key={item} onClick={()=>props.onSelect(item)} className={item === props.currentItem?"list-group-item list-group-item-action active":"list-group-item list-group-item-action"}>{item}</li>
                ))
            }
                
            </ul>
        </>
     )
}

export default Genre;