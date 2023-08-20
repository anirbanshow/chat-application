import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { ChatState } from '../context/ChatProvider';
import { isLastMessage, isSameSender } from '../config/ChatLogics';

const Scrollable = ({ message }) => {

    // Context API 
    const [user, setUser] = ChatState();

    return (
        <div className="message_area p-2">
            <ScrollableFeed>
                {
                    message.map((m, i) => (
                        <div
                            className={`${m.sender._id === user._id ? "outgoing" : "incoming"} message`}
                            key={m._id}
                            style={{ backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}` }}
                        >

                            <p>{m.content}</p>

                            {
                                (isSameSender(message, m, i, user._id)
                                    || isLastMessage(message, i, user._id)
                                ) && (
                                    <img src='https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' />
                                )
                            }
                        </div>
                    ))
                }
            </ScrollableFeed>
        </div>
    )
}

export default Scrollable;