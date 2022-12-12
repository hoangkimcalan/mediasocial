import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import { allUsersRoute } from '../utils/APIRoutes';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

function Chat() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkUserCurrent = async () => {
            if (!localStorage.getItem("chat-app-user")) {
                navigate("/login");
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
                setIsLoading(true);
            }
        }
        checkUserCurrent();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    console.log(data);
                    setContacts(data.data);
                } else {
                    navigate("/setAvatar");
                }
            }
        }
        fetchData();
    }, [currentUser])

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    return (
        <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-[#536976]">
            <div className="overflow-hidden md:grid hidden h-[85vh] w-[85vw] bg-[#17181f] rounded-3xl grid-cols-4 gap-2">
                <div className="bg-[#1f2029] w-full overflow-hidden col-span-1">
                    <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                </div>
                <div className="col-span-3 bg-[#1f2029] w-full h-full justify-center items-center">
                    {
                        isLoading && currentChat === undefined
                            ? <Welcome currentUser={currentUser} />
                            : <ChatContainer currentChat={currentChat} currentUser={currentUser} />
                    }
                </div>

            </div>
            <div className="overflow-hidden md:hidden h-[85vh] w-[85vw] bg-[#17181f] rounded-xl grid grid-rows-5 gap-2">
                <div className="bg-[#1f2029]">
                    <Contacts contacts={contacts} currentUser={currentUser} />
                </div>
                <div className="row-span-4 bg-[#1f2029]">

                </div>

            </div>
        </div>
    )
}

export default Chat;