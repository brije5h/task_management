import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import Cards from '../components/Cards';


const IncompleteTask = () => {
    const [Data, setData] = useState();

    useEffect(()=>{
    const fetch = async () => {
        try{
            const response = await axios.get("http://localhost:8000/api/v2/get-incomplete-tasks", {
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
    console.log("FROM Completed Task");
    Data && console.log(Data);

    return (
        <>
            <div className='bg-red-400'>
                {Data && (<Cards home={"false"} data={Data} />)}
            </div>
        </>
    )
}

export default IncompleteTask;
