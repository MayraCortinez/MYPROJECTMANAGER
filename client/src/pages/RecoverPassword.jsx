import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { clientAxios } from '../config/clientAxios.js';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie'; 

export const RecoverPassword = () => {
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState("");
  const [tokenChecked, setTokenChecked] = useState(false);
  const [send, setSend] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['cookie-token']);  

  const handleShowAlert = (msg) => {
    setAlert({
      msg
    });
    setTimeout(() => {
      setAlert({});
    }, 2000);
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        setSend(true);
        const url = '/api/auth/reset-password';
        const { data } = await clientAxios.get(url, {
          headers: {
            Authorization: `Bearer ${cookies['cookie-token']}`,
          },
        });
        console.log(data.msg);
        setTokenChecked(true);
        setSend(false);
      } catch (error) {
        console.error(error);
        handleShowAlert(error.response?.data.msg);
      }
    };
    checkToken();
  }, [cookies]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      handleShowAlert("Debes ingresar una nueva contraseña");
      return null;
    }

    try {
      const url = `/api/auth/reset-password`;
      const { data } = await clientAxios.post(url, { password });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Contraseña modificada con éxito',
        text: data.msg,
        confirmButtonText: 'Iniciar sesión',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setPassword("");
          navigate('/');
        }
      });
    } catch (error) {
      console.error(error);
      handleShowAlert(error.response?.data.msg);
      setPassword("");
    }
  };

  return (
    <>
      <h1 className='text-sky-600 font-black text-3xl capitalize md:flex md:justify-center'>
        Solicitar nueva contraseña
      </h1>
      {alert.msg && <Alert {...alert} />}
      {tokenChecked && (
        <form
          onSubmit={handleSubmit}
          className='my-10 p-8 bg-white rounded-lg border shadow-lg'
          noValidate
        >
          <div className='my-5'>
            <label
              htmlFor='password'
              className='text-gray-400 block font-bold'
            ></label>
            <input
              id='password'
              type='password'
              placeholder='Ingrese su nueva contraseña'
              className='w-full mt-3 p-3 border rounded'
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='bg-sky-700 w-full py-3 text-white uppercase font-sans rounded  hover:bg-sky-800 transition-colors mb-4'
            disabled={send}
          >
            Guardar nueva contraseña
          </button>
        </form>
      )}

      <nav className='md:flex md:justify-between'>
        <Link
          to={'/register'}
          className=' text-sky-700 block text-center my-3 text-sm uppercase '
        >
          Registrarse
        </Link>
        <Link
          to={'/'}
          className=' text-sky-700 block text-center my-3 text-sm uppercase '
        >
          Iniciar sesión
        </Link>
      </nav>
    </>
  );
};
