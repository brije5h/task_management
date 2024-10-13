import React from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link } from 'react-router-dom';

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

    return (
        <>
            <div>
                <h2 className='text-xl font-semibold'>Username</h2>
                <h4 className='my-1 text-gray-500'>xyz@gmail.com</h4>
                <hr />
            </div>
            <div>
                {data.map((items, i) => (
                    <Link key={i} to={items.link} className='my-2 flex items-center gap-1 hover:bg-gray-600 p-2 rounded transition-all duration-100'>{items.icon}{items.title}</Link>
                ))}
            </div>
            <div className='mt-16'>
                <button className='bg-gray-600 w-full p-2 rounded'>Log Out</button>
            </div>
        </>
    );
};

export default Sidebar;