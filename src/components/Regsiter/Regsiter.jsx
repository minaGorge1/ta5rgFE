import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import image from "../../image/part 1.png"

export default function Regsiter() {

    let [user, sitUser] = useState({
        userName: "",
        phone: "",
        email: "",
        password: "",
        cPassword: "",
    })

    let [errorApi, setErrorApi] = useState("")
    let [errorLest, setErrorLest] = useState("")
    let [louding, setLouding] = useState(false)
    let navgiate = useNavigate()

    function addUser(e) {
        let myUser = { ...user }
        myUser[e.target.name] = e.target.value
        sitUser(myUser)
    }

    async function submitForm(e) {
        e.preventDefault() // al slook al bda2y ll submit
        let valid = ValidData() // vaild

        if (valid.error == null) {

            setLouding(true)
            let { data } = await axios.post('https://test1-2x7cjptq0-minagorge1.vercel.app/auth/sign_up', user)

            setLouding(false)
            if (data.message === 'Done') {
                // login
                navgiate('/login')
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
            userName: Joi.string().max(20).required().alphanum(),
            phone: Joi.string().required(),
            email: Joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4, tlds: { allow: ["com", "net"] } }).required(),
            password: Joi.string().required(),
            cPassword: Joi.string().required().valid(Joi.ref('password'))
        })

        return scheme.validate(user, { abortEarly: false }) // dy al btkarin w btl3lk 2h aly na2s

    }

    return (
        <>




            <section id="sec" class="main-bg w-100 h-100 ">
                <div class="w-100 d-flex justify-content-center h-100 filter pb-3 ">
                    <div class=" mt-5 shadow-intro form-signup   w-50 h-auto rounded-4" id="form">


                        <div class=" position-absolute mx-5 mb-5 pb-5 w-25 d-flex justify-content-between  rounded-4">
                            <img class="w-50 " src={image} alt="" />
                        </div>
                        <div class=" col-md-12 rounded-4">
                            <div class="w-100 rounded-4">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1440 320"><path fill="#175a99"
                                        fill-opacity="1" d="M0,256L34.3,245.3C68.6,235,137,213,206,218.7C274.3,224,343,256,411,261.3C480,267,549,245,617,250.7C685.7,256,754,288,823,282.7C891.4,277,960,235,1029,213.3C1097.1,192,1166,192,1234,197.3C1302.9,203,1371,213,1406,218.7L1440,224L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z">
                                    </path>
                                </svg>

                            </div>

                        </div>

                        <div class="mb-2"><h1 class="text-center main-color ">sing up</h1></div>


                        <div id="formSignUp" class="d-flex justify-content-center">

                            <div class="w-75">
                                <form onSubmit={submitForm} >
                                    <div className='mt-3'>
                                        <label className='main-color' htmlFor="userName">Frist name</label>
                                        <input type="text" onChange={addUser} className='inputLogin form-control mt-2 bg-transparent ' id='userName' name='userName' />
                                    </div>

                                    <div className='mt-3'>
                                        <label className='main-color' htmlFor="phone">phone</label>
                                        <input type="text" onChange={addUser} className='inputLogin form-control mt-2 bg-transparent text-white' id='phone' name='phone' />
                                    </div>

                                    <div className='mt-3'>
                                        <label className='main-color' htmlFor="email">Email</label>
                                        <input type="email" onChange={addUser} className='inputLogin form-control mt-2 bg-transparent text-white' id='email' name='email' />
                                    </div>
                                    <div className='d-flex justify-content-between '>
                                        <div className='mt-3 col-md-5'>
                                            <label className='main-color' htmlFor="password">Password</label>
                                            <input type="password" onChange={addUser} className='inputLogin form-control mt-2 bg-transparent text-white' id='password' name='password' />
                                        </div>

                                        <div className='mt-3 col-md-5'>
                                            <label className='main-color' htmlFor="cPassword">repeat Password</label>
                                            <input type="password" onChange={addUser} className='inputLogin form-control mt-2 bg-transparent text-white' id='cPassword' name='cPassword' />
                                        </div>
                                    </div>
                                    <div className='m-3 text-center d-flex justify-content-center'>
                                        {errorLest.length > 0 ? errorLest.map((el, i) => <div key={i} className=' m-1 w-75 alert-log'>{el.message}</div>) : ""}
                                        {errorApi === "" ? "" : <div className=' m-1 w-75 text-center alert-log'>{errorApi}</div>}
                                    </div>

                                    <div className='mt-3 d-flex justify-content-end'>
                                        {louding ?
                                            <button className='text-blue bg-transparent  px-2 py-1 w-100 border-1 rounded-2 btn-login mt-3'><i className='fa-solid fa-spinner fa-spin mt-3'></i></button>
                                            : <button type='submit' className='text-blue bg-transparent  px-2 py-1 w-100 border-1 rounded-2 btn-login mt-3 '>Register</button>}

                                    </div>
                                </form>
                            </div>

                        </div>


                        <div class="text-center m-5">
                            <span class="text-black mt-4">Are you have an account?</span>
                            <Link className=" fs-2" to='/login'><a class=" mx-2 text-white text-decoration-none mb-2 fs-5 main-color" id="ankor" href="index.html">Log in</a></Link>
                        </div>

                    </div>
                </div>

            </section>
        </>
    );
}


