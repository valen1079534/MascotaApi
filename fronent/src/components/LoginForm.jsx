import React, { useState, useRef } from "react"
import img from "./../../public/bg-login.svg"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

  function LoginForm() {

 /*    const [login, setLogin] = useState(false) */

    const email = useRef(null)
    const password = useRef(null)
    const navigate = useNavigate()

/*     const handleToggle = () => {
      setLogin(!login)
    } */

    const handleSubmit= (e) => {
      e.preventDefault()

      try {
      const email_user = email.current.value
      const password_user = password.current.value

      const data = {
        email: email_user,
        password: password_user
      }

      axios.post('http://localhost:5000/auth/validar', data).then((response) => {
        console.log(response.data)

        if(response.status == 200){
          localStorage.setItem("token", response.data.token)
          navigate('/Home')
        }
        else if (response.status == 404){
          console.log('Error en todo lado')
        }
      })
    }
    catch(error){
      console.log('Error servidor', error)
    }
    }


    return(
        <div  className="flex flex-col items-center h-[20%] rounded justify-center min-h-screen"
        style={{backgroundImage:`url(${img})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
        >

          <form onSubmit={handleSubmit} className="mt-96">
          
            <div className="flex flex-col mt-36">
            <input 
            type='email'
            ref={email}
            className="my-3 bg-transparent pr-2 py-2 border border-black shadow-sm bg-slate-200 focus:border-verdeSena2 focus:ring-0 text-gray-950 rounded-2xl placeholder-blue-950" 
            placeholder="correo electronico " 
            required
            />
            </div>

            <div className="flex flex-col">
            <input 
            type='password'
            ref={password}
            className="my-3 bg-transparent pr-2 py-2 border border-black shadow-sm bg-slate-200 focus:border-verdeSena2 focus:ring-0 text-gray-950 rounded-2xl placeholder-blue-950" 
            placeholder="contraseña"
            required />
            </div>

            <div className="flex flex-col">
            <button  className="my-3 bg-sky-950 pr-2 py-2 border w-80 border-sky-950 shadow-sm focus:border-verdeSena2 focus:ring-0 text-white rounded-2xl">Ingresar</button>
            </div>
            
          </form>
      </div>
    )}

export default LoginForm
