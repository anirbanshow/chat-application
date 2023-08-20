import React from 'react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

const HomePage = () => {
    return (
        <div className="container py-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-5">

                    <h3 className='bg-light text-center rounded-pill py-1'>Let's Chat</h3>

                    <div className="card p-3 shadow" style={{ maxWidth: 600 }}>

                        <nav>
                            <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                                <button className="nav-link w-50 active" id="nav-login-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-login" type="button" role="tab"
                                    aria-controls="nav-login" aria-selected="true">
                                    Login
                                </button>
                                <button className="nav-link w-50" id="nav-register-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-register" type="button" role="tab"
                                    aria-controls="nav-register" aria-selected="false">
                                    Register
                                </button>
                            </div>
                        </nav>

                        <div className="tab-content p-3 border bg-light">

                            <div className="tab-pane fade active show" id="nav-login" role="tabpanel" aria-labelledby="nav-login-tab">
                                <Login />
                            </div>

                            <div className="tab-pane fade" id="nav-register" role="tabpanel" aria-labelledby="nav-register-tab">
                                <Signup />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HomePage;