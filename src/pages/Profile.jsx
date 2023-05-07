import React, { useContext } from 'react'
import { Context } from '..'
import Loader from '../components/Loader'
import '../styles/profile.css'

function Profile() {
  const {loading,user} = useContext(Context)
  return (
    loading ? <Loader/> :
    <div className='profile_details'>
      <h1>{user&&user.name}</h1>
      <h3>{user&&user.email}</h3>
    </div>
  )
}

export default Profile