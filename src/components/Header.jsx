import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import '../styles/Header.css'
import { Context, server } from '../index'
import axios from 'axios';
import { toast } from 'react-hot-toast';
function Header() {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);

  const logoutHandler = async()=>{
    setLoading(true);
    try {
      const {data} = await axios.get(`${server}/user/logout`,{
        withCredentials:true
      })
      setIsAuthenticated(false)
      setLoading(false)
      toast.success(data.message);
    } catch (error) {

      setIsAuthenticated(true);

      setLoading(false)
      toast.error(error.response.data.message);
    }
  }

  return (
    <nav className='header'>
        <div>
            <Link to={"/"}>TODO App</Link>
        </div>
        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            {
              isAuthenticated? 
              <button disabled={loading} onClick={logoutHandler} className='btn'>Logout</button>:
              <Link to={"/login"}>Login</Link>
          }
        </article>
    </nav>
  )
}

export default Header