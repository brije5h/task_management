import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios";


const SignUp = () => {
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const history = useNavigate(); 
    if(isLoggedIn===true){
        history("/");
    }
    const [Data, setData] = useState({ username:"", email:"", password:"" });
    const change = (e)=>{
        const {name,value} = e.target;
        setData({ ...Data, [name]: value }); 
    };
    const submit = async () => {
        if(Data.username === "" | Data.email === "" | Data.password===""){
            alert("All fields are required");
        }
        else{
            try{
                const response = await axios.post("http://localhost:8000/api/v1/sign-in",Data);
                console.log(response);
                setData({ username:"", email:"", password:"" });
                alert(response.data.message);
                history("/login");

            } catch(err){
                console.log("Error during startup:",err.response.data);
                alert(err.response.data.message);
            }
        }
    };

  return (
    <div className='h-[98vh] flex items-center justify-center '>
        <div className='p-4 w-2/6 rounded bg-gray-800'>
            <div className='text-2xl font-bold'>SignUp</div>
            <input 
                type="username" 
                placeholder='Username' 
                className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                name='username'
                value={Data.username}
                onChange={change}
            />
            <input 
                type="email" 
                placeholder='Email' 
                className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                name='email'
                required
                value={Data.email}
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
                <button className='bg-blue-400 text-xl font-semibold text-black px-2 py-1 rounded' onClick={submit}>
                    Sign Up
                </button>
                <Link to="/login" className='text-gray-400 hover:text-gray-300'>Already have an account? Login</Link>
            </div>
        </div>
    </div>
  )
}

export default SignUp
