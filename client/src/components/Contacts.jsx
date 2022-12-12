import React, { useState, useEffect } from 'react';

import Logo from "../assets/logo.png";
import "../index.css";


function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }

    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }

    return (
        <>
            {currentUserName && currentUserImage && (
                <div className="p-4 flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex gap-1 items-center justify-center mb-2">
                        <img src={Logo} alt="" className="h-8" />
                        <h1 className="font-bold text-base uppercase text-slate-200">QqChat</h1>
                    </div>

                    {/* Contact another users */}
                    <div className="flex flex-col justify-between items-center overflow-auto gap-3 scrollbar-contact transition">
                        {contacts.map((contact, index) => (
                            <div onClick={() => changeCurrentChat(index, contact)} className={`bg-[#ffffff39] rounded-xl min-h-[5rem] cursor-pointer flex items-center transition px-2 gap-4 w-[95%] py-1 ${index === currentSelected ? "selected-contact" : ""}`} key={index}>
                                <div>
                                    <img className="h-16" src={`${contact.avatarImage}.png`} alt="avatar" />
                                </div>
                                <div>
                                    <h2 className="text-white text-base leading-relaxed">{contact.username}</h2>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Current User */}
                    <div className="bg-[#4e4376] bottom-0 flex justify-center gap-8 items-center mt-2 rounded-md h-[5rem]">
                        <div>
                            <img src={`${currentUserImage}.png`} alt="avatar" className="h-16 w-full" />
                        </div>
                        <div>
                            <h3 className="text-white text-xl font-bold leading-relaxed">{currentUserName}</h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Contacts;