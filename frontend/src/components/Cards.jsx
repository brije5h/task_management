import React, { useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";
import axios from 'axios';


const Cards = ({ home, setInputDiv, data }) => {

    const [prevData, setData] = useState(data);

    const handleCompleteTask = async (id)=>{
        try{
            const response = await axios.put(`http://localhost:8000/api/v2/update-completed-task/${id}`,
                {},
                {headers: { 
                    id: localStorage.getItem("id"), // If you are passing the user id through the headers
                    authorization: `Bearer ${localStorage.getItem("token")}`, // If you are using a token
                }}
                
            );
            if (response.status === 200) {
                setData(prevData =>
                    prevData.map(item =>
                        item._id === id ? { ...item, complete: !item.complete } : item
                    )
                );
            }
        } catch(err){
            console.log(err);
        }
    }
    
    const handleImpTask = async (id)=>{
        try{
            const response = await axios.put(`http://localhost:8000/api/v2/update-imp-task/${id}`,
                {},
                {headers: { 
                    id: localStorage.getItem("id"), // If you are passing the user id through the headers
                    authorization: `Bearer ${localStorage.getItem("token")}`, // If you are using a token
                }}
                
            );
            if (response.status === 200) {
                setData(prevData =>
                    prevData.map(item =>
                        item._id === id ? { ...item, important: !item.important } : item
                    )
                );
            }
        } catch(err){
            console.log(err);
        }
    }

    const handleDeleteTask = async (id)=>{
        try{
            const response = await axios.delete(`http://localhost:8000/api/v2/delete-task/${id}`,
                {headers: { 
                    id: localStorage.getItem("id"), // If you are passing the user id through the headers
                    authorization: `Bearer ${localStorage.getItem("token")}`, // If you are using a token
                }}  
            );
            console.log(response.data.message);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className='grid grid-cols-4 gap-4 p-4'>
            {prevData && prevData.map((items, i) => (
                <div key={i} className='flex flex-col justify-between bg-gray-800 rounded-lg p-4 hover:bg-gray-700 cursor-pointer transition-all'>
                    <div className=''>
                        <h1 className='text-xl font-semibold'>{items.title}</h1>
                        <p className='text-gray-300'>{items.desc}</p>
                    </div>
                    <div className='mt-2 flex items-center justify-between'>
                        <div className='border-red-500'>
                            <button className={` ${items.complete === false ? "bg-red-500" : "bg-green-800"} rounded p-2  font-semibold hover:scale-105 cursor-pointer transition-all`}
                            onClick={()=>handleCompleteTask(items._id)} >
                                {items.complete === true ? "Completed": "Incomplete"}
                            </button>
                        </div>
                        <div className='flex gap-4 '>
                            <button className='hover:scale-150 cursor-pointer transition-all'
                                onClick={()=> handleImpTask(items._id)}>
                                    {items.important === true ? (<FaHeart />):(<CiHeart />)}
                            </button>
                            <button className='hover:scale-150 cursor-pointer transition-all'>
                                <FaEdit />
                            </button>
                            <button className='hover:hover:scale-150 cursor-pointer transition-all'
                                onClick={()=>handleDeleteTask(items._id)}>
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                </div>

            ))}
            {home === "true" && (
            <button className='flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 hover:bg-gray-700 cursor-pointer transition-all'>
                <MdAddCircleOutline className='text-5xl' onClick={()=>setInputDiv("fixed")}/>
                <h2 className='text-2xl mt-4'>Add Task</h2>
            </button>)}

        </div>
    );
};

export default Cards;
