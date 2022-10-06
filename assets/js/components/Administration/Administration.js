import React from "react";
import {Link } from 'react-router-dom';




const Administration = () => {



    return (

        <section id="create-page" className="create">
            <h3 className="bg-gradient-to-r from-red-500 text-4xl  flex justify-center content-center text-white w-full py-5 my-5">Административен панел
            </h3>
            <div className='flex justify-center place-items-center gap-6 py-5 '>
            <Link to="/stops"  >
                <button  className=" w-60 h-16 bg-red-500  text-white font-bold py-2 px-4 rounded">Спирки</button >
            </Link>
            <Link to="/schedules" >
                <button  className="w-60 h-16 bg-red-500 text-white font-bold py-2 px-4 rounded">Линии</button >
            </Link>
                <Link to="/schedule-panel" >
                    <button  className="w-60 h-16 bg-red-500 text-white font-bold py-2 px-4 rounded">Разписания</button >
                </Link>
                <Link to="/view_all_messages" >
                    <button  className="w-60 h-16 bg-red-500 text-white font-bold py-2 px-4 rounded">Съобщения</button >
                </Link>
            </div>
        </section>
    );


}

export default Administration;
