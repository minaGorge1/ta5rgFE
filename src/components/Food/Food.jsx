import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import helthy from "../../image/helthy.png"
import unhelthy from "../../image/unhelthy.png"


const Food = () => {
    const [ok, setOk] = useState(true);
    let [resultF, setResult] = useState([]);
    let [louding, setLouding] = useState(false)
    let { nameDisease } = useParams()
    useEffect(() => {
        updateData(nameDisease)
    }, [])
    console.log(nameDisease);
    async function updateData(nameDisease) {
        setLouding(true)
        let { data } = await axios.get(`https://test1-jp49rrpn9-minagorge1.vercel.app/food/${nameDisease}`)
        console.log(data);
        if (!data.message === "Done") {
            setOk(false)
            setLouding(false)
        } else {
            handleChange(data, nameDisease)
        }
    }
    const handleChange = (data, name) => {
        setResult(resultF = data.food[0].food);
        setLouding(false)
        console.log(resultF);
    }


    return (
        <div className=' main-color h-100'>
            <div className=' main-color w-100 '>
                <div className=' main-color '>
                    <div className='d-flex justify-content-center mt-5'>
                        {ok || resultF ? <h1 className='text-red  text-center fs-1 w-25 px-2 py-1 border-0 rounded-5 '>{nameDisease}</h1>
                            : <p>louding.....</p>}
                    </div>
                    <div class=" container"><hr /></div>

                    <div> <section class=" container">
                        <main class="row ">
                            <div className='d-flex justify-content-center  align-items-center container'>
                                {!louding ?
                                    <div className=" text-center fs-5">{resultF.map((el) => <div className=' mb-3 row main-color-border p-3 result rounded-5 justify-content-between '>
                                        {el.status === "helthy" ? <div className='col-3  mb-4'><img className='w-50 m-1 mt-3 rounded-circle bg-white' src={helthy} alt="" /></div> :
                                            <div className='col-3  mb-4'><img className='w-50 m-1 mt-3 rounded-circle bg-white' src={unhelthy} alt="" /></div>}
                                        <div className='pb-1 text-center col-9 py-5'>
                                            <label>{el.name} </label>
                                            <label className='text-white'>&nbsp; This food is &nbsp;</label>
                                            {el.status === "helthy" ? <label className='text-success'>{el.status}</label> :
                                                <label className='text-danger'>{el.status}</label>}</div> </div>)}
                                    </div>
                                    : <p><i className='fa-solid text-danger fs-1 m-5 p-5 fa-spinner fa-spin'></i></p>}
                            </div>
                        </main>

                    </section>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Food;
