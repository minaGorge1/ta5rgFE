import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

export default function Home({ saveUser }) {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



  const [selectedOption, setSelectedOption] = useState({ d1: '', d2: '', d3: '', d4: '', d5: '' });
  const [ok, setOk] = useState(false);

  let [resultF, setResult] = useState({});

  let [errorApi, setErrorApi] = useState("")
  let [errorLest, setErrorLest] = useState("")
  let [louding, setLouding] = useState(false)

  var date = {
    dayName: days[new Date().getDay()],
    dayNum: new Date().getDate(),
    month: months[new Date().getMonth()]
  };

  let symptms = [
    { name: 'fatigue', value: "41" },
    { name: 'weight loss', value: "129" },
    { name: 'restlessness', value: "94" },
    { name: 'lethargy', value: "60" },
    { name: 'irregular sugar level', value: "53" },
    { name: 'blurred and distorted vision', value: "13" },
    { name: 'obesity', value: "76" },
    { name: 'increased appetite', value: "49" },
    { name: 'polyuria', value: "85" },
    { name: 'excessive hunger', value: "37" },
    { name: 'chills', value: "19" },
    { name: 'cough', value: "26" },
    { name: 'high fever', value: "46" },
    { name: 'breathlessness', value: "14" },
    { name: 'malaise', value: "65" },
    { name: 'phlegm', value: "84" },
    { name: 'chest pain', value: "18" },
    { name: 'fast heart rate', value: "40" }
  ]


  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };

  let [feature] = useState([
    { "key": "d1", "value": '' },
    { "key": "d2", "value": '' },
    { "key": "d3", "value": '' },
    { "key": "d4", "value": '' },
    { "key": "d5", "value": '' },
  ])

  useEffect(() => {

  }, [])

  const handleChange = (key, selectedOption, e) => {

    setSelectedOption(prev => ({ ...prev, [key]: selectedOption }));
    for (let i = 0; i < 5; i++) {
      const element = feature[i];
      if (!ok) {
        if (key === element.key) {
          element.value = selectedOption
        }
      }
    }
    setOk(feature.every(e => e.value !== ''));
  };





  async function sibmetfeature(e) {
    e.preventDefault() // al slook al bda2y ll submit
    const url = "https://flask-production-736f.up.railway.app//test";
    if (ok) {
      const output = JSON.stringify(selectedOption)
      setLouding(true)
      try {
        await axios.post(url, output, config).then(response => setResult(response.data))
      } catch (error) {
        setErrorApi(error)
      }
      setLouding(false)
    } else {
      setErrorLest("select all")
    }
  }


  return (
    <>
      <div className=' w-100  bg-white h-100'>
        <div className='bg-Home '>

          <div> <section class=" container main-color h-100">
            <main class="   main-color h-100">
              <p class=" m-4 pt-1 fs-3   ">{date.dayName} , {date.dayNum} {date.month}</p>
              <h1 class=" m-4 pt-1 fs-2   ">Hello , {saveUser.userName}</h1>
              <hr />
              <form onSubmit={sibmetfeature} className=' w-100'>
                <div class=" d-flex   justify-content-center w-100 ">
                  <div className='row justify-content-center w-100 align-items-center'>

                    <div className='select-style col-12 row justify-content-center '>
                      <select class=" form-select m-2 dropdown w-50 main-color main-color-border p-2 fs-3 rounded-3 "
                        onClick={(e) => handleChange("d1", e.target.value, e)} selectedOption={selectedOption.d1} name="cars" id="list1">
                        <option className='d-none' value="">select your sympthms</option>
                        {symptms.map((el, i) => <option key={el.value} value={el.value} className=' m-auto w-75 dropdown-item'>{el.name}</option>)}
                      </select>
                    </div>

                    <div className='col-12 row justify-content-center'>
                      <select class=" m-2 dropdown w-50 main-color main-color-border p-2 fs-3 rounded-3 "
                        onClick={(e) => handleChange("d2", e.target.value)} selectedOption={selectedOption.d2} name="cars" id="list2">
                        <option className='d-none' value="">select your sympthms</option>
                        {symptms.map((el, i) => <option key={el.value} value={el.value} className=' m-auto w-75 dropdown-item'>{el.name}</option>)}
                      </select>
                    </div>

                    <div className='col-12 row justify-content-center'>
                      <select class="m-2 dropdown w-50 main-color main-color-border p-2 fs-3 rounded-3 "
                        onClick={(e) => handleChange("d3", e.target.value)} selectedOption={selectedOption.d3} name="cars" id="list3">
                        <option className='d-none' value="">select your sympthms</option>
                        {symptms.map((el, i) => <option key={el.value} value={el.value} className=' m-auto w-75 dropdown-item'>{el.name}</option>)}
                      </select>
                    </div>

                    <div className='col-12 row justify-content-center'>
                      <select class="m-2 dropdown w-50 main-color main-color-border p-2 fs-3 rounded-3 "
                        onClick={(e) => handleChange("d4", e.target.value)} selectedOption={selectedOption.d4} name="cars" id="list4">
                        <option className='d-none' value="">select your sympthms</option>
                        {symptms.map((el, i) => <option key={el.value} value={el.value} className=' m-auto w-75 dropdown-item'>{el.name}</option>)}
                      </select>
                    </div>

                    <div className='col-12 row justify-content-center'>
                      <select class="m-2 dropdown w-50 main-color main-color-border p-2 fs-3 rounded-3 "
                        onClick={(e) => handleChange("d5", e.target.value)} selectedOption={selectedOption.d5} name="cars" id="list5">
                        <option className='d-none' value="">select your sympthms</option>
                        {symptms.map((el, i) => <option key={el.value} value={el.value} className=' m-auto w-75 dropdown-item'>{el.name}</option>)}
                      </select>
                    </div>
                    <br />
                  </div>
                </div>
                {errorApi === "" ? "" : <div className='alert-log p-2 m-2 w-75 d-flex justify-content-center '>{errorApi}</div>}
                {errorLest.length > 0 ? errorLest.map((el, i) => <div className=' d-flex justify-content-center'><div key={i} className=' alert-log p-2 m-2 w-75 d-flex justify-content-center '>{el.message}</div></div>) : ""}
                <br />
                <div className='d-flex justify-content-center'>
                  <br />
                  {!louding ? <Link to={'/Food/' + resultF.result}><a href className='text-primary bg-transparent text-center fs-3 w-25 px-2 py-1 border-0 rounded-5 my-3'><b>{resultF.result}</b></a> </Link> : <p><b>louding.....</b></p>}
                </div>

                <div className='d-flex justify-content-center'>
                  {ok ? <button type='submit' className='text-blue bg-transparent w-25 px-2 py-1  border-1 rounded-5 btn-login my-5'>Submit</button> : <p><b>select all sympthms</b></p>}
                </div>

              </form>


            </main>
          </section>
          </div>
        </div>
      </div>




    </>
  )
}
