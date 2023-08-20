import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider';
import { SelectedChatState } from '../context/SelectedChatProvider';
import { ListState } from '../context/ListProvider';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogics';
import GroupChatModal from './miscellaneous/GroupChatModal';

const MyChats = ({ fetchAgain }) => {

    const [user, setUser] = ChatState();
    const [selectedChat, setSelectedChat] = SelectedChatState();
    const [chats, setChats] = ListState();

    const [loggedUser, setloggedUser] = useState("");

    const fetchChats = async () => {
        try {
            const { data } = await axios.get(`/api/chat`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setChats(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setloggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
    }, [fetchAgain]);

    return (
        <div className='w-30 bg-dark-subtle rounded'>

            <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
                <p className='mb-0 me-3'>My Chats</p>

                <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#GroupChatModal">
                    New Group chat +
                </button>

            </div>

            {
                chats ? (
                    <div className="userListing px-2">
                        {
                            chats.map((chat) => (
                                <div className={`eachUser ${selectedChat === chat ? "chatActive" : "chat"}`}
                                    key={chat._id}
                                    onClick={() => setSelectedChat(chat)}
                                >
                                    <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" alt="" />
                                    <div className="info">
                                        <h6>
                                            {
                                                !chat.isGroupChat
                                                    ? getSender(loggedUser, chat.users)
                                                    : (chat.chatName)
                                            }
                                        </h6>
                                        <p>other details</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <ChatLoading />
                )
            }

            <GroupChatModal />

        </div>
    )
}

export default MyChats