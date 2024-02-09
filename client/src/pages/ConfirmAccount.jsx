import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { clientAxios } from '../config/clientAxios';
import { Alert } from '../components/Alert';
import Swal from 'sweetalert2';

export const ConfirmAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({});

  const handleShowAlert = (msg) => {
    setAlert({
      msg
    });
    setTimeout(() => {
      setAlert({});
    }, 10000);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const confirmAccount = async () => {
      try {
        url='https://backend-kappa-one-37.vercel.app/'
        // Realiza la solicitud GET a la ruta correcta (checked en este caso)
        const response = await url.get(`/api/checked?token=${token}`);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Bienvenida/o a Project Manager!',
          text: response.data.msg,
          confirmButtonText: 'Inicia sesión',
          allowOutsideClick: false
        }).then(result => {
          if (result.isConfirmed) {
            navigate('/');
          }
        });
      } catch (error) {
        console.error('Error al confirmar la cuenta:', error);
        if (error.isAxiosError && !error.response) {
          handleShowAlert('Error de conexión al servidor. Por favor, intenta de nuevo más tarde.');
        } else {
          handleShowAlert(error.response?.data.msg || 'Error al confirmar la cuenta');
        }
      }
    };

    // Verifica si hay un token en la URL antes de realizar la confirmación
    if (token) {
      confirmAccount();
    } else {
      handleShowAlert('Token de confirmación no encontrado en la URL');
    }
  }, [location.search, navigate]);

  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize">
        Confirma tu cuenta
      </h1>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-white'>
        {alert.msg && (
          <>
            <Alert {...alert} />
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
                ¿No tienes cuenta? Regístrate
              </Link>
              <Link
                to={"/forget-password"}
                className=" text-sky-700 block text-center my-3 text-sm uppercase "
              >
                ¿Has olvidado la contraseña?
              </Link>
            </nav>
          </>
        )}
      </div>
    </>
  );
};

