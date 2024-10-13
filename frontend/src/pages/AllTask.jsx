import React, { useState } from 'react';
import Cards from '../components/Cards.jsx';
import { MdAddCircleOutline } from "react-icons/md";
import InputData from '../components/inputData.jsx';

const AllTask = () => {
    const [inputDiv, setInputDiv] = useState("hidden");

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
                <Cards home={"true"} setInputDiv={setInputDiv}/>
            </div>

            {/* Passing both inputDiv state and setInputDiv function as props */}
            <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} />
        </>
    );
};

export default AllTask;
