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
        <span key={key}>{title}</span>
        <span>{description}</span>
      </div>
      <div>
        <input onChange={()=>updateHandler(id)} type="checkbox" checked={isCompleted} />
        <button onClick={()=>deleteHandler(id)} className="btn">DELETE</button>
      </div>
    </div>
  );
}

export default Todoitem;
