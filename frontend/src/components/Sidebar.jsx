import React, { useEffect, useState } from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import axios from 'axios';

const Sidebar = () => {
    const data = [
        {
            title: "All tasks",
            icon: <CgNotes />,
            link: "/",
        },
        {
            title: "Important tasks",
            icon: <MdLabelImportant />,
            link: "/importantTasks",
        },
        {
            title: "Completed tasks",
            icon: <FaCheckDouble />,
            link: "/completeTasks",
        },
        {
            title: "Incomplete tasks",
            icon: <TbNotebookOff />,
            link: "/incompleteTasks",
        },
    ];
    const history = useNavigate();
    const dispatch = useDispatch();

    const [Data, setData] = useState();
    const logout = ()=>{
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        history("/login");
    }
    useEffect(()=>{
        const fetch = async () =>{
            try{
                const response = await axios.get("http://localhost:8000/api/v2/get-all-tasks", {
                    headers: { 
                        id: localStorage.getItem("id"), // If you are passing the user id through the headers
                        authorization: `Bearer ${localStorage.getItem("token")}`, // If you are using a token
                    },
                });
                console.log(response.data);
                setData(response.data.data);
            } catch(err){
                console.log(err);
            }
        };
        fetch();
    },[]);


    return (
        <>
            {Data && (
                <div>
                    <h2 className='text-xl font-semibold'>{Data.username}</h2>
                    <h4 className='my-1 text-gray-500'>{Data.email}</h4>
                    <hr />
                </div>
                )
            }
            <div>
                {data.map((items, i) => (
                    <Link key={i} to={items.link} className='my-2 flex items-center gap-1 hover:bg-gray-600 p-2 rounded transition-all duration-100'>{items.icon}{items.title}</Link>
                ))}
            </div>
            <div className='mt-16'>
                <button className='bg-gray-600 w-full p-2 rounded hover:bg-gray-500' onClick={logout}>Log Out</button>
            </div>
        </>
    );
};

export default Sidebar;