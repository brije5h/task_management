import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {

    const [Data, setData] = useState({ username:"", password:"" });
    const history = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn); 
    if(isLoggedIn===true){
        history("/");
    }

    const change = (e)=>{
        const {name,value} = e.target;
        setData({ ...Data, [name]: value }); 
    };
    const submit = async () => {
        if(Data.username === "" | Data.password===""){
            alert("All fields are required");
        }
        else{
            try{
                const response = await axios.post("http://localhost:8000/api/v1/login",Data);
                setData({ username:"", password:"" });
                console.log(response);
                localStorage.setItem("id",response.data.id);
                localStorage.setItem("token",response.data.token);
                dispatch(authActions.login());
                history("/");
            } catch(err){
                console.log("Error during startup:",err.response.data);
                alert(err.response.data.message);
            }
        }
    };

  return (
    <div className='h-[98vh] flex items-center justify-center '>
        <div className='p-4 w-2/6 rounded bg-gray-800'>
            <div className='text-2xl font-bold'>Login</div>
            <input 
                type="username" 
                placeholder='Username' 
                className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                name='username'
                value={Data.username}
                onChange={change}
            />
            <input 
                type="password" 
                placeholder='Password' 
                className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                name='password' 
                value={Data.password}
                onChange={change}

            />
            <div className='w-full flex items-center justify-between '>
                <button className='bg-blue-400 text-xl font-semibold text-black px-2 py-1 rounded hover:bg-blue-500' onClick={submit}>
                    Login
                </button>
                <Link to="/signup" className='text-gray-400 hover:text-gray-300'>No having an account? SignUp here</Link>
            </div>
        </div>
    </div>
  )
}

export default Login
