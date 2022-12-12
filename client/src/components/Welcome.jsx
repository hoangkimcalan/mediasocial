import React from 'react';
import Welcomegif from "../assets/welcome.gif";

function Welcome({ currentUser }) {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full gap-2">
            <img src={Welcomegif} alt="Welcome" />
            <h1 className="text-white font-bold text-2xl">
                Welcome, <span className="text-red-500 uppercase">{currentUser?.username}</span>
            </h1>
            <h3 className="text-[#bfe9ff] font-bold text-xl">
                Please select a chat to Start Messaging!
            </h3>
        </div>
    )
}

export default Welcome;