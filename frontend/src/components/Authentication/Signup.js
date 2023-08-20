import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [pic, setpic] = useState("");
    const [loading, setloading] = useState(false);

    const navigate = useNavigate();

    const handlePasswordVisuality = () => {
        setShowPassword(!showPassword);
    }
    const handleConfirmPasswordVisuality = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const postDetails = (pics) => {
        setloading(true);
        if (pics == undefined) {
            alert("Please select an image");
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dhk35jbds");

            fetch("https://api.cloudinary.com/v1_1/dhk35jbds/image/upload", {
                method: "POST",
                body: data
            })
                .then((res) => res.json())
                .then(data => {
                    setpic(data.url.toString());
                    setloading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setloading(false);
                })
        } else {
            alert("Please upload an image");
            setloading(false);
        }
    }

    const submitHandler = async () => {
        setloading(true);
        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill all the fields");
        }
        if (password != confirmPassword) {
            alert("Passwords do not match");
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.post(
                "/api/user",
                { name, email, password },
                config
            );

            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/chats");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="mb-3">
                <label htmlFor="name_id" className="form-label">Name:</label>
                <input type="text" className="form-control" id="name_id" placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email_id" className="form-label">Email address:</label>
                <input type="email" className="form-control" id="email_id" placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3 passwordContainer">
                <label htmlFor="password_id" className="form-label">Password:</label>
                <input type={showPassword ? "text" : "password"} className="form-control" id="password_id" placeholder="enter password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="showHide" onClick={handlePasswordVisuality}>
                    <b>{showPassword ? "Hide" : "Show"}</b>
                </div>
            </div>
            <div className="mb-3 passwordContainer">
                <label htmlFor="cpassword_id" className="form-label">Confirm Password:</label>
                <input type={showConfirmPassword ? "text" : "password"} className="form-control" id="cpassword_id"
                    placeholder="enter confirm password"
                    onChange={(e) => setconfirmPassword(e.target.value)}
                />
                <div className="showHide" onClick={handleConfirmPasswordVisuality}>
                    <b>{showConfirmPassword ? "Hide" : "Show"}</b>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="file_id" className="form-label">Profile Image:</label>
                <input type="file" className="form-control" id="file_id" accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </div>

            <div className='d-flex justify-content-center'>
                <button type="submit" className="btn btn-primary" onClick={submitHandler}>Sign Up</button>
            </div>

        </>
    )
}

export default Signup;