import React, {useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';
import { clientAxios } from "../config/clientAxios";
import {Link, useNavigate} from 'react-router-dom';
import {Alert} from '../components/Alert';
import Swal from 'sweetalert2';

export const ConfirmAccount = () => {

    const [alert, setAlert] = useState({});

    const navigate = useNavigate();

    const [cookies] = useCookies(['cookie-token']);

    const handleShowAlert = (msg) => {
        setAlert({
          msg
        });
        setTimeout(() => {
          setAlert({});
        }, 10000)
    }

    useEffect(() => {
      
        const confirmAccount = async () => {
            try {  
             const url = '/api/auth/checked'
             const { data } = await clientAxios.get(url, {
                headers: {
                    Authorization : `Bearer ${cookies['cookie-token']}`,
                }
             })

             Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Bienvenida/o a Project Manager!',
                text: data.msg,
                confirmButtonText: 'Inicia sesión',
                allowOutsideClick : false
              }).then(result => {
                if(result.isConfirmed){
                    navigate('/')
                }
              })

            } catch (error) {
                console.error(error)
                handleShowAlert(error.response?.data.msg)
            }
        }
        confirmAccount();
    }, [cookies, navigate]);
    
  

    return (
        <>
            <h1 className="text-sky-600 font-black text-3xl capitalize">
                Confirma tu cuenta
            </h1>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white'>
                {
                    alert.msg && (
                        <>
                            <Alert {...alert}/> 
                            <nav className="md:flex md:justify-between">
                                <Link
                                to={"/"}
                                className=" text-sky-700 block text-center my-3 text-sm uppercase "
                                >
                                ¿Ya te has registrado? Inicia sesión
                                </Link>
                                <Link
                                to={'/register'}
                                className=" text-sky-700 block text-center my-3 text-sm uppercase "
                                >
                                ¿No tienes cuenta? Registrate
                                </Link>
                                <Link
                                to={"/forget-password"}
                                className=" text-sky-700 block text-center my-3 text-sm uppercase "
                                >
                                ¿Has olvidado la contraseña?
                                </Link>
                            </nav>
                        </>
                    )
                }
                

            </div>
        </>
    )
} 