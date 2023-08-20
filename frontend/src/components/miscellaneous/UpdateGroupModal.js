import React, { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { SelectedChatState } from '../../context/SelectedChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import ChatLoading from '../ChatLoading';
import SearchUserList from '../UserAvatar/SearchUserList';
import axios from 'axios';

const UpdateGroupModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {

    const [user, setUser] = ChatState();
    const [selectedChat, setSelectedChat] = SelectedChatState();

    const [groupChatName, setgroupChatName] = useState("");
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);


    const handleAddUser = async (user1) => {
        // Code
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            alert("User alreay in group");
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            alert("Only admin can add users");
            return;
        }

        // Send PUT Request
        try {
            setLoading(true);

            const { data } = await axios.put(`/api/chat/groupadd`, {
                chatId: selectedChat._id,
                userId: user1._id
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemove = async (user1) => {
        // Code

        if (selectedChat.groupAdmin._id !== user._id && user._id !== user1._id) {
            alert("Only admin can remove users");
            return;
        }

        // Send PUT Request
        try {
            setLoading(true);

            const { data } = await axios.put(`/api/chat/groupremove`, {
                chatId: selectedChat._id,
                userId: user1._id
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            user._id === user1._id ? setSelectedChat() : setSelectedChat(data);

            setFetchAgain(!fetchAgain);
            fetchMessages();
            window.location.reload();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRename = async () => {
        if (!groupChatName) return;
        console.log(groupChatName);
        try {
            setRenameLoading(true);
            const { data } = await axios.put(`/api/chat/rename`, {
                chatId: selectedChat._id,
                chatName: groupChatName
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearch = async (query) => {
        setSearch(query);
        if (!search) {
            return false;
        }
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/user?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="modal fade GroupChatModal" id="updateGroupModal" tabIndex="-1" aria-labelledby="updateGroupModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-info"> {selectedChat.chatName}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-black">

                        <div className='useradd'>
                            {
                                selectedChat.users.map((user) => (
                                    <UserBadgeItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleRemove(user)}
                                    />
                                ))
                            }
                        </div>

                        <div className='row'>
                            <div className="col-auto">
                                <input type="text" className="form-control" id="name" placeholder='Chat Name'
                                    onChange={(e) => setgroupChatName(e.target.value)}
                                />
                            </div>
                            <div className="col-auto">
                                <button type="button" className="btn btn-primary" onClick={handleRename}>Rename Group</button>
                            </div>
                        </div>

                        <input type="text" className="form-control" id="users" placeholder='Add Users'
                            onChange={(e) => handleSearch(e.target.value)}
                        />

                        <div className="fetchUsers">
                            {
                                loading ? (
                                    <ChatLoading />
                                ) : (
                                    searchResult?.slice(0, 4).map(user => (
                                        <SearchUserList
                                            key={user._id}
                                            user={user}
                                            handleFunction={() => handleAddUser(user)}
                                        />
                                    ))
                                )
                            }
                        </div>

                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger"
                            onClick={() => handleRemove(user)}
                        >
                            Leave Group
                        </button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateGroupModal;