import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import { SelectedChatState } from '../context/SelectedChatProvider';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ReceiverModal from './miscellaneous/ReceiverModal';
import UpdateGroupModal from './miscellaneous/UpdateGroupModal';
import ChatLoading from './ChatLoading';
import axios from 'axios';
import Scrollable from './Scrollable';

import io from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    // Context API 
    const [user, setUser] = ChatState();
    const [selectedChat, setSelectedChat] = SelectedChatState();

    // Define State
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setnewMessage] = useState("");
    const [socketConnect, setSocketConnect] = useState(false);

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            setLoading(true);
            const { data } = await axios.get(`/api/message/${selectedChat._id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );
            setMessage(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connection", () => setSocketConnect(true));
    }, []);


    const sendMesage = async (event) => {
        if (event.key === "Enter" && newMessage) {

            try {
                const { data } = await axios.post(`/api/message`,
                    {
                        chatId: selectedChat._id,
                        content: newMessage
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user.token}`
                        }
                    }
                );

                setnewMessage("");
                // console.log(data);

                socket.emit("new message", data);

                setMessage([...message, data])
            } catch (error) {
                console.log(error);
            }
        }
    }

    const typingHandler = async (e) => {
        setnewMessage(e.target.value);

        // Typing Indicator Logic
    }

    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            console.log("new Message Received");
            console.log(newMessageReceived);
            setMessage([...message, newMessageReceived]);
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                console.log("true");
            } else {
                console.log("false");
            }
        });
    });


    return (
        <>
            {
                selectedChat ? (
                    <>
                        <div className="d-flex justify-content-between align-items-center pb-2">
                            {
                                !selectedChat.isGroupChat ? (
                                    <>
                                        <h5 className='mb-0 me-3 text-black'>
                                            {
                                                getSender(user, selectedChat.users)
                                            }
                                        </h5>
                                        <button className='btn btn-primary'
                                            data-bs-toggle="modal" data-bs-target="#receiverModal">
                                            Receiver Info
                                        </button>
                                        <ReceiverModal user={getSenderFull(user, selectedChat.users)} />
                                    </>
                                ) : (
                                    <>
                                        <h5 className='mb-0 me-3 text-black'>
                                            {selectedChat.chatName.toUpperCase()}
                                        </h5>
                                        <button className='btn btn-primary'
                                            data-bs-toggle="modal" data-bs-target="#updateGroupModal">
                                            Group Info
                                        </button>
                                        <UpdateGroupModal
                                            fetchAgain={fetchAgain}
                                            setFetchAgain={setFetchAgain}
                                            fetchMessages={fetchMessages}
                                        />
                                    </>
                                )
                            }
                        </div>

                        {
                            loading ? (
                                <ChatLoading />
                            ) : (
                                <>
                                    {/* message_area */}
                                    <Scrollable message={message} />
                                </>
                            )
                        }

                        <div>
                            <textarea id="textarea" rows="1" placeholder="write a message"
                                value={newMessage}
                                onChange={typingHandler}
                                onKeyDown={sendMesage}
                                required
                            ></textarea>
                        </div>

                    </>
                ) : (
                    <h5 className='text-black text-center pt-5'>Click on a user to start chating</h5>
                )
            }

        </>
    )
}

export default SingleChat;