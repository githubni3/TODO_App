import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import Header from './components/Header';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import { useContext, useEffect } from 'react';
import { Context, server } from '.';
import axios from 'axios';

function App() {

  const {setUser,setIsAuthenticated} = useContext(Context)

  useEffect(()=>{
    axios.get(`${server}/user/profile`,{
      withCredentials:true
    }).then((res)=>{
      setUser(res.data.user);
      setIsAuthenticated(true);
    }).catch((error)=>{
      setUser({})
      setIsAuthenticated(false);
    })
  },[])

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App;
