import React, { useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {

    const [user, setUser] = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div style={{ width: "100%" }}>

            {
                user && <SideDrawer />
            }

            <div className='d-flex justify-content-between mt-2 p-2 w-100 success-subtle bg-secondary text-white'
                style={{ height: '90vh' }}
            >
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </div>

        </div>
    )
}

export default ChatPage;