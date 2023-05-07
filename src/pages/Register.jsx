import React, { useContext, useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import '../styles/Login.css'
import axios from 'axios';
import {Context, server} from '../index.js'
import { toast } from 'react-hot-toast';
function Register() {

  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);


    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const submitHandler = async(e) =>{
        setLoading(true)
        e.preventDefault();
        try {
            const {data} = await axios.post(`${server}/user/new`,{
                name,email,password,
            },{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
            setIsAuthenticated(true);
            setLoading(false)
            toast.success(data.message);
        } catch (error) {
            setIsAuthenticated(false);
            setLoading(false)
            toast.error(error.response.data.message);
        }
    }
    if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div className='form'>
        <section>
            <form onSubmit={submitHandler} className='Form' method="post">
                <input type="text" placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                <input type="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                <input type="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
                <button disabled={loading} type="submit">Sign Up</button>
                <h4>or</h4>
                <Link to={"/login"}>Login</Link>
            </form>
        </section>
    </div>
  )
}

export default Register