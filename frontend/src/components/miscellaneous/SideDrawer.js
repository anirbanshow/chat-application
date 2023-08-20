import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListing from '../UserAvatar/UserListing';
import { ChatState } from '../../context/ChatProvider';
import { SelectedChatState } from '../../context/SelectedChatProvider';
import { ListState } from '../../context/ListProvider';

const SideDrawer = () => {

    const [user, setUser] = ChatState();
    const [selectedChat, setSelectedChat] = SelectedChatState();
    const [chats, setChats] = ListState();

    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState("");
    const [sideDrawer, setSideDrawer] = useState(false);

    const activeSideDrawer = () => {
        setSideDrawer(!sideDrawer);
    }

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    }

    const handleSearch = async () => {
        if (!search) {
            alert("Please enter a search term");
        }
        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            console.log(error);
        }
    }

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                }
            };

            const { data } = await axios.post(`/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) {
                setChats([data, ...chats])
            }

            setSelectedChat(data);
            setLoadingChat(false);
            setSideDrawer(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Chat App</a>

                    <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <button className="btn btn-outline-success" type="button" onClick={activeSideDrawer}>
                            Search
                        </button>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={user.pic} alt="" style={{ width: '30px' }} />
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href='profileModal'
                                            data-bs-toggle="modal" data-bs-target="#profileModal">
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>

            <div className={`sidebar ${sideDrawer ? 'active' : ''} `}>

                <div className='d-flex justify-content-between align-items-center px-3 pt-3'>
                    <p className='m-0'>Search User</p>
                    <FontAwesomeIcon icon={faXmark} beat onClick={() => setSideDrawer(!sideDrawer)} />
                </div>

                <hr />

                <div className='px-3 pb-2'>

                    <div className='d-flex'>
                        <input type="text" className='seachInput' onChange={(e) => setSearch(e.target.value)} />
                        <button typeof='button' className='searchButton' onClick={handleSearch}>Go</button>
                    </div>

                </div>

                <div className="userListing px-2">
                    {
                        loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult.map((user) => (
                                <UserListing
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)}
                                />
                            ))
                        )
                    }
                    {
                        loadingChat && <ChatLoading />
                    }
                </div>

            </div>

            <ProfileModal user={user} />
        </>
    )
}

export default SideDrawer;