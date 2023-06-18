import axios from 'axios';
import Joi from 'joi';
import image from "../../image/Untitled-1.png"
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Login({ saveUser }) //props.saveUser
{

    let [user, sitUser] = useState({
        email: "",
        password: ""
    })

    let [errorApi, setErrorApi] = useState("")
    let [errorLest, setErrorLest] = useState("")
    let [louding, setLouding] = useState(false)
    let navgiate = useNavigate()

    function addUser(e) {
        let myUser = { ...user }
        myUser[e.target.name] = e.target.value // biro ll object [element = name ]
        sitUser(myUser)
    }

    async function submitForm(e) {
        e.preventDefault() // al slook al bda2y ll submit
        let valid = ValidData() // vaild

        if (valid.error == null) {

            setLouding(true)
            let { data } = await axios.post('https://test1-3p7j99e3s-minagorge1.vercel.app/auth/sign_in', user)
            setLouding(false)
            if (data.message === 'Done') {
                // login
                navgiate('/home') /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA1YTA5MjlhMmJiMDA2NzAzM2FhMGYiLCJmaXJzdF9uYW1lIjoiQWhtZWQiLCJsYXN0X25hbWUiOiJBYmQgQWwtTXV0aSIsImVtYWlsIjoiYWhtZWRtdXR0aUBnbWFpbC5jb20iLCJhZ2UiOjIzLCJpYXQiOjE2MTA5ODE2NjR9.En_GnIB7mk7HiaUuedf0c0PseYaaL6prBMF1vn1pyLI */
                localStorage.setItem('token', data.token) // bn7fz al token user in local storage

                saveUser() // call fun aly b decode al token
            } else {
                // error
                setErrorApi(data.message)
            }
        } else {
            setErrorLest(valid.error.details)
        }
    }

    function ValidData() {

        let scheme = Joi.object({
            email: Joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),//top level domin
            password: Joi.string().required()
        })
        return scheme.validate(user, { abortEarly: false }) // dy al btkarin w btl3lk 2h aly na2s

    }

    return (
        <>


            <section id="sec" class="main-bg w-100 h-100">
                <div class="w-100 d-flex justify-content-center h-100 filter pb-3 ">

                    <div
                        id="form"
                        class="d-flex justify-content-center m-5 shadow-intro form-size h-auto  rounded-4"
                    >
                        <div class=" position-absolute w-25 d-flex justify-content-center pt-5 ">
                            <img class="w-50" src={image} alt="" />
                        </div>
                        <div class=" col-md-12 rounded-4">
                            <div class="w-100 rounded-4">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1440 320"><path fill="#175a99"
                                        fill-opacity="1" d="M0,256L34.3,245.3C68.6,235,137,213,206,218.7C274.3,224,343,256,411,261.3C480,267,549,245,617,250.7C685.7,256,754,288,823,282.7C891.4,277,960,235,1029,213.3C1097.1,192,1166,192,1234,197.3C1302.9,203,1371,213,1406,218.7L1440,224L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z">
                                    </path>
                                </svg>
                            </div>
                            <div class="d-flex justify-content-center w-100 ">

                                <br />

                                <form onSubmit={submitForm} className=' w-50'>
                                    <div id="formlogin" class="text-center mt-5 ">
                                        <input
                                            class="mt-5 w-75 bg-transparent inputLogin text-white border-2 rounded-2 fs-5 px-2 py-1  border-light"
                                            placeholder="Enter Your email"
                                            onChange={addUser}
                                            id='email' name='email'
                                        />

                                        <div id="alrtEmail" class="opacity-0 text-danger">
                                            Error in email
                                        </div>

                                        <input
                                            class="bg-transparent inputLogin text-white my-2 w-75 border-1 rounded-2 fs-5 px-2 py-1  border-light"
                                            placeholder="Enter Your password"
                                            type="password"
                                            onChange={addUser}
                                            id='password' name='password'
                                        />

                                        <div id="alrtPw" class="opacity-0 text-danger">Error</div>

                                        {errorLest.length > 0 ? errorLest.map((el, i) => <div className=' d-flex justify-content-center'><div key={i} className=' alert-log p-2 m-2 w-75 d-flex justify-content-center '>{el.message}</div></div>) : ""}

                                        {errorApi === "" ? "" : <div className='alert-log p-2 m-2 w-75 d-flex justify-content-center '>{errorApi}</div>}


                                        {louding ?
                                            <button className='btn text-blue bg-transparent mt-4 px-2 py-1 w-25 border-1 rounded-2 btn-login'><i className='fa-solid fa-spinner fa-spin'></i></button>
                                            : <button type='submit' className='btn text-blue bg-transparent mt-4 px-2 py-1 w-25 border-1 rounded-2 btn-login'>Login</button>}
                                        <div class="text-center m-5 main-color">
                                            <span class=" mt-4 text-black">Don’t have an account?</span>
                                            <Link className=" fs-2" to='/regsiter'><a class=" mx-2 main-color text-decoration-none mb-2 fs-6" id="ankor" href="index.html">Sign up</a></Link>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </>
    );
}