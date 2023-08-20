import React, { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { ListState } from '../../context/ListProvider';
import ChatLoading from '../ChatLoading';
import axios from 'axios';
import SearchUserList from '../UserAvatar/SearchUserList';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = () => {

    const [groupChatName, setgroupChatName] = useState("");
    const [selectedUsers, setselectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = ChatState();
    const [chats, setChats] = ListState();

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

    const handleSubmit = async (e) => {
        if (!groupChatName || !selectedUsers) {
            alert("Please fill all the fields");
        }
        try {
            const { data } = await axios.post(`/api/chat/group`, {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u._id))
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setChats([data, ...chats]);
            alert("New Group Chat Create successfully");
        } catch (error) {
            console.log(error);
        }
    }

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            alert("User already added");
            return;
        }

        setselectedUsers([...selectedUsers, userToAdd]);
    }

    const handleDelete = (delUser) => {
        setselectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    }

    return (
        <div className="modal fade GroupChatModal" id="GroupChatModal" tabIndex="-1" aria-labelledby="GroupChatModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-black">Create Group Chat</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" className="form-control" id="name" placeholder='Chat Name'
                            onChange={(e) => setgroupChatName(e.target.value)}
                        />
                        <input type="text" className="form-control" id="users" placeholder='Add Users'
                            onChange={(e) => handleSearch(e.target.value)}
                        />

                        <div className='useradd'>
                            {
                                selectedUsers.map(user => (
                                    <UserBadgeItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleDelete(user)}
                                    />
                                ))
                            }
                        </div>

                        <div className="fetchUsers">
                            {
                                loading ? (
                                    <ChatLoading />
                                ) : (
                                    searchResult?.slice(0, 4).map(user => (
                                        <SearchUserList
                                            key={user._id}
                                            user={user}
                                            handleFunction={() => handleGroup(user)}
                                        />
                                    ))
                                )
                            }
                        </div>

                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create Chat</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupChatModal;