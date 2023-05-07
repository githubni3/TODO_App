import axios from "axios";
import React, {  useContext, useEffect, useState } from "react";
import { Context, server } from "..";
import { toast } from "react-hot-toast";
import "../styles/Home.css";
import Todoitem from "../components/Todoitem";
import { Navigate } from "react-router-dom";

export default function Home() {

  const {isAuthenticated} = useContext(Context)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh,setRefresh] = useState(false)

  const updateHandler = async(id) => {
    try {
      const {data} = await axios.put(`${server}/task/${id}`,{},{
        withCredentials:true
      })
      toast.success(data.message)
      setRefresh(!refresh)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async(id) => {
    try {
      const {data} = await axios.delete(`${server}/task/${id}`,{
        withCredentials:true
      })
      toast.success(data.message)
      setRefresh(!refresh)

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setLoading(false);
      setTitle("");
      setDescription("");
      setRefresh(!refresh)
  
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      setTitle("");
      setDescription("");
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/mytask`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  },[refresh]);

  if(!isAuthenticated) return <Navigate to={"/login"}/>

  return (
    <div className="form">
      <section className="taskForm">
        <form onSubmit={submitHandler} className="Form" method="post">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          />
          <button disabled={loading} type="submit">
            Add Task
          </button>
        </form>
      </section>

      <div className="todoContainer">
        {tasks &&
          tasks.map((i) => (
            <Todoitem
              title={i.title}
              description={i.description}
              isCompleted={i.isCompleted}
              key={i._id}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              id={i._id}
            />
          ))}
      </div>
    </div>
  );
}
