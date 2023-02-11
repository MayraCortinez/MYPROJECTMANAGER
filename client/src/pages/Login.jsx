import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

export const Login = () => {

  const [alert, setAlert] = useState({});
  const {setAuth} = useAuth();
  const navigate = useNavigate();

  const handleShowAlert = (msg, time = true) => {  //segundo parámetro, si no se indica lo contrario, tendrá tiempo de duración.
    setAlert({
      msg
    });
    if(time){
      setTimeout(() => {
        setAlert({});
      }, 2000);
    }
    reset()
    };

    const {formValues, handleInputChange, reset} = useForm({
      email: "",
      password: ""
    })

    const{email, password} = formValues;

//envío de formulario
    const handleSubmit = async (e) => {
      e.preventDefault();

      if ([email, password].includes("")){
        handleShowAlert("No deben quedar campos vacíos");
        return null
    }

      try {
        
        const { data } = await clientAxios.post('/auth/login',{
          email, 
          password
        })

        //console.log(data);
        
        setAuth(data.user);                               //envío la información al estado global. Cargo el id en el auth.
        sessionStorage.setItem('token', data.token);   

        navigate('/projects');
  
      } catch (error) {
          console.log(error);
          handleShowAlert(error.response?.data.msg);
      }

    }

return (
    <>
      <h1 className='text-sky-600 font-black text-3xl capitalize md:flex md:justify-center'>Inicia sesión</h1>

      {
        alert.msg && <Alert {...alert} /> 
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
              placeholder="Ingresar email"
              className="w-full mt-3 p-3 border rounded"
              autoComplete='off'
              name="email"
              value={email}
              onChange={handleInputChange}
              
              />
          </div>
          <div className="my-5">
            <label htmlFor="password" className="text-gray-400 block font-bold uppercase">Contraseña</label>
            <input 
              id="password"
              type="password"
              placeholder="Ingresar contraseña"
              className="w-full mt-3 p-3 border rounded"
              name="password"
              value={password}
              onChange={handleInputChange}

              />
          </div>
          <button
            type="submit"
            className="bg-sky-700 w-full py-3 text-white uppercase font-sans rounded  hover:bg-sky-800 transition-colors mb-4"
          >
            Iniciar sesión
          </button>
      </form>
      <nav className='md:flex md:justify-between'>
        <Link
          to={'/register'}
          className=" text-sky-700 block text-center my-3 text-sm uppercase "
        >
          ¿No tienes cuenta? Registrarse
        </Link>
        <Link
          to={'/forget-password'}
          className=" text-sky-700 block text-center my-3 text-sm uppercase "
        >
           ¿Has olvidado la contraseña?
        </Link>
        
      </nav>
    </>
  )
}
