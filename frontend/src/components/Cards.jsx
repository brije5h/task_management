import React from 'react';
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";

const Cards = ({ home, setInputDiv }) => {
    const data = [
        {
            title: "The Best Coding Channel",
            desc: "I have to create my channel in Hindi for those who do not understand English programming tutorials.",
            status: "Incomplete",
        },
        {
            title: "CPP Concepts",
            desc: "I need to clear basics of Cpp. Topics: Abstraction, Inheritance, Polymorphism, Virtual Functions, etc.",
            status: "Incomplete",
        },
        {
            title: "Assignment",
            desc: "My assignment on 20th March. I have to complete it.",
            status: "Incomplete",
        },
        {
            title: "Projects",
            desc: "For Project I need to see tutorials of the code master YouTube channel.",
            status: "Incomplete",
        },
        {
            title: "React Basics",
            desc: "I need to understand React hooks and lifecycle methods to build interactive UIs.",
            status: "Incomplete",
        },
        {
            title: "Data Structures",
            desc: "Study linked lists, trees, and graphs for upcoming coding interviews.",
            status: "Incomplete",
        },
        {
            title: "Algorithm Optimization",
            desc: "Optimize the time complexity of algorithms before the competitive coding competition.",
            status: "Incomplete",
        },
        {
            title: "Backend Development",
            desc: "Complete the Node.js and Express.js sections for backend understanding.",
            status: "Incomplete",
        },
        {
            title: "JavaScript Mastery",
            desc: "Learn advanced JavaScript topics like closures, promises, and async-await patterns.",
            status: "Incomplete",
        },
        {
            title: "Database Management",
            desc: "Understand relational databases and write SQL queries for CRUD operations.",
            status: "Completed",
        },

    ];

    return (
        <div className='grid grid-cols-4 gap-4 p-4'>
            {data && data.map((items, i) => (
                <div className='flex flex-col justify-between bg-gray-800 rounded-lg p-4 hover:scale-105 cursor-pointer transition-all'>
                    <div className=''>
                        <h1 className='text-xl font-semibold'>{items.title}</h1>
                        <p className='text-gray-300'>{items.desc}</p>
                    </div>
                    <div className='mt-2 flex items-center justify-between'>
                        <button className={` ${items.status === "Incomplete" ? "bg-red-500" : "bg-green-800"} rounded p-2`}>
                            {items.status}
                        </button>
                        <div className='flex gap-4'>
                            <button><CiHeart /></button>
                            <button><FaEdit /></button>
                            <button><MdDelete /></button>
                        </div>
                    </div>
                </div>

            ))}
            {home === "true" && (
            <button className='flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 hover:scale-105 cursor-pointer transition-all'>
                <MdAddCircleOutline className='text-5xl' onClick={()=>setInputDiv("fixed")}/>
                <h2 className='text-2xl mt-4'>Add Task</h2>
            </button>)}

        </div>
    );
};

export default Cards;
