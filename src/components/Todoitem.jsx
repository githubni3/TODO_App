import React from "react";
import "../styles/Todoitem.css";

function Todoitem({
  title,
  description,
  isCompleted,
  key,
  updateHandler,
  deleteHandler,
  id
}) {
  return (
    <div className="taskCard">
      <div>
        <div key={key}>{title}</div>
        <div>{description}</div>
      </div>
      <div>
        <input onChange={()=>updateHandler(id)} type="checkbox" checked={isCompleted} />
        <button onClick={()=>deleteHandler(id)} className="btn">DELETE</button>
      </div>
    </div>
  );
}

export default Todoitem;
