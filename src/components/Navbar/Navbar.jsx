
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import part1 from "../../image/part 1.png"
import part2 from "../../image/part 2.png"

export default function Navbar({ user, LogOut }) {

    return (

        <div className="bg-black">
            <nav className="navbar navbar-expand-lg navbar-dark nav-bg fs-5 ">
                <div className="container-fluid position-relative">
                    <Link className="navbar-brand fs-2" to='/' >
                        <div class="d-flex w-50 justify-content-start  ">
                            <div class="col-md-4 ps-5  ">
                                <img
                                    src={part1}
                                    alt=""
                                    class="w-75 "
                                />
                            </div>

                            <div class="col-md-10 me-5 pe-5 pt-2 ">
                                <img
                                    src={part2}
                                    alt=""
                                    class="w-50 "
                                />
                            </div>
                        </div></Link>
                    <button id='btn-list' className=" navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-around" id="navbarSupportedContent">

                        {user != null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                           
                                <li className="nav-item mx-2">
                                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='home' >Home</NavLink>
                                </li>
                            

                            <div className=' '>
                                <li className=" mx-3 nav-item">
                                    <span className="nav-link" onClick={LogOut}>Logout</span>
                                </li>
                            </div>
                        </ul>

                            : <ul className="navbar-nav ms-auto mx-2 mb-lg-0">

                                
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='login' >Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='regsiter' >Regsiter</NavLink>
                                </li>

                            </ul>}





                    </div>
                </div>
            </nav>
        </div>
    );
}

