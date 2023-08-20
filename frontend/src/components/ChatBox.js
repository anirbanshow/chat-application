import React from 'react';
import { ChatState } from '../context/ChatProvider';
import { SelectedChatState } from '../context/SelectedChatProvider';
import { ListState } from '../context/ListProvider';
import SingleChat from './SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {

    const [user, setUser] = ChatState();
    const [selectedChat, setSelectedChat] = SelectedChatState();

    return (
        <div className={`bg-light p-2 rounded msgDiv`} >

            <SingleChat
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
            />

        </div>
    )
}

export default ChatBox