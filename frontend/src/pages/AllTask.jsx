import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards.jsx';
import { MdAddCircleOutline } from "react-icons/md";
import InputData from '../components/inputData.jsx';
import axios from 'axios';

const AllTask = () => {
    const [inputDiv, setInputDiv] = useState("hidden");
    const [Data, setData] = useState();

    useEffect(()=>{
        const fetch = async () =>{
            try{
                const response = await axios.get("http://localhost:8000/api/v2/get-all-tasks", {
                    headers: { 
                        id: localStorage.getItem("id"), // If you are passing the user id through the headers
                        authorization: `Bearer ${localStorage.getItem("token")}`, // If you are using a token
                    },
                });
                setData(response.data.data);
            }catch(err){
                console.log(err);
            }
        };
        fetch();
    },[]);
    console.log("FROM AllTask.js.....");
    Data && console.log(Data.tasks);

    // Function to show the form
    const showForm = () => {
        setInputDiv("fixed"); // Show the form by setting "block"
    };

    return (
        <>
            <div className=''>
                <div className='w-full flex justify-end px-4 py-2'>
                    <button onClick={showForm}>
                        <MdAddCircleOutline className='text-4xl text-gray-400 hover:text-gray-300 transition-all duration-300' />
                    </button>
                </div>
                {Data && <Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} />}
            </div>

            {/* Passing both inputDiv state and setInputDiv function as props */}
            <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} />
        </>
    );
};

export default AllTask;
