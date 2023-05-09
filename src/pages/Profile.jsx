import React, { useContext } from 'react'
import { Context } from '..'
import '../styles/profile.css'
import { Navigate } from 'react-router-dom'

function Profile() {
  const {user,isAuthenticated} = useContext(Context)
  
  if(!isAuthenticated) return <Navigate to={"/login"}/>
  
  return (
    <div className='profile_details'>
      <h1>{user&&user.name}</h1>
      <h3>{user&&user.email}</h3>
    </div>
  )
}

export default Profile