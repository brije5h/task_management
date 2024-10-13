import React from 'react';
import { IoClose } from "react-icons/io5";

const InputData = ({ inputDiv, setInputDiv }) => {
    // Function to hide the form
    const hideForm = () => {
        setInputDiv("hidden"); // Hide the form by setting "hidden"
    };

    return (
        <>
            {/* Modal background */}
            <div className={`${inputDiv} fixed top-0 left-0 bg-gray-500 opacity-50 h-screen w-full`}></div>

            {/* Modal content */}
            <div className={`${inputDiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className='w-2/6 bg-gray-800 p-4 rounded'>
                    <div className='flex justify-end mb-3'>
                        <button className='text-2xl' onClick={hideForm}>
                            <IoClose />
                        </button>
                    </div>
                    {/* Form content */}
                    <input 
                        type="text" 
                        name="title" 
                        placeholder='Title' 
                        className='px-3 py-4 rounded w-full bg-gray-700'
                    />
                    <textarea 
                        name="desc" 
                        cols='30' 
                        rows="10"
                        placeholder='Description'
                        className='px-3 py-4 rounded w-full bg-gray-700 mt-3'
                    ></textarea>
                    <button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold'>
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
};

export default InputData;
