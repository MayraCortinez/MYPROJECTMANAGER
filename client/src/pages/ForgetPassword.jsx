import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Alert } from '../components/Alert';
import { clientAxios } from "../config/clientAxios";
import Swal from 'sweetalert2';


export const ForgetPassword = () => {

    const [alert, setAlert] = useState({});
    const [email, setEmail] = useState("");
    const [send, setSend] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

/*         if(!email){
            handleShowAlert('Email inválido')
        } */

        try {
            setSend(true)
            const {data} = await clientAxios.post('/api/auth/send-token',
                {
                  email,
                }, 
                { credentials: 'include' }
                );

            console.log("Respuesta del servidor:", data);

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Solicitud exitosa',
                    text: data.msg,
                    confirmButtonText: 'OK',
                    allowOutsideClick : false
                  })

                setEmail("");
              setSend(false);

        } catch (error) {
            handleShowAlert(error.response?.data.msg);
            setEmail("");
        }
    }

    const handleShowAlert = (msg) => {
        setAlert({
          msg
        });
        setTimeout(() => {
          setAlert({});
        }, 5000)
    }

    return (
    <>
      <h1 className='text-sky-600 font-black text-3xl capitalize md:flex md:justify-center'>Solicitar nueva contraseña</h1>
        {
            alert.msg && <Alert {...alert}/>
        }
      <form 
      onSubmit={handleSubmit}
      className='my-10 p-8 bg-white rounded-lg border shadow-lg' 
      noValidate >

          <div className="my-5">
            <label htmlFor="email" className="text-gray-400 block font-bold uppercase">Correo electrónico</label>
            <input 
              id="email"
              type="email"
              placeholder="Ingrese su email"
              className="w-full mt-3 p-3 border rounded"
              autoComplete='off'
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              />
          </div>
          
          <button
            type="submit"
            className="bg-sky-700 w-full py-3 text-white uppercase font-sans rounded  hover:bg-sky-800 transition-colors mb-4"
            disabled={send}
          >
            Enviar
          </button>
      </form>
      <nav className='md:flex md:justify-between'>
        <Link
          to={'/register'}
          className=" text-sky-700 block text-center my-3 text-sm uppercase "
        >
            Registrarse
        </Link>
        <Link
          to={'/'}
          className=" text-sky-700 block text-center my-3 text-sm uppercase "
        >
          Iniciar sesión
        </Link>
        
      </nav>
    </>
    )
}

