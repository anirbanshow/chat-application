import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleVisuality = () => {
        setShow(!show);
    }

    const submitHandler = async () => {
        if (!email || !password) {
            alert("Please fill all the fields");
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.post("api/user/login",
                { email, password },
                config
            );

            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));

            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="mb-3">
                <label htmlFor="email_id" className="form-label">Email address:</label>
                <input type="email" className="form-control" id="email_id" placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3 passwordContainer">
                <label htmlFor="password_id" className="form-label">Password:</label>
                <input type={show ? "text" : "password"} className="form-control" id="password_id" placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="showHide" onClick={handleVisuality}>
                    <b>{show ? "Hide" : "Show"}</b>
                </div>
            </div>
            <div className='d-flex justify-content-center mb-3 '>
                <button type="submit" className="btn w-100 btn-primary" onClick={submitHandler}>Sign Up</button>
            </div>

            <div className='d-flex justify-content-center'>
                <button type="submit" className="btn w-100 btn-danger" onClick={() => {
                    setEmail("guest@example.com");
                    setPassword("1234");
                }}>
                    Get Guest User Credentials
                </button>
            </div>
        </>
    )
}

export default Login;