
import {React, useState} from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import { useForm } from "../hooks/useForm";
import Swal from 'sweetalert2';
const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;


export const Register = () => {

  const [alert, setAlert] = useState({});
  const [send, setSend] = useState(false);

  const {formValues, setFormValues, handleInputChange, reset} = useForm({
    name: "",
    email: "",
    password: "",
    password2: ""
  })

  const {name, email, password, password2} = formValues;

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(formValues)

    if ([name, email, password, password2].includes("")){
        handleShowAlert("No deben quedar campos vacíos");
        return null
    }

    if (!exRegEmail.test(email)){
      handleShowAlert("Email con formato inválido");
      return null
    }

    if (password !== password2){
      handleShowAlert("Las contraseñas deben coincidir");
      return null
    }

    try {

      setSend (true);

      const {data} = await clientAxios.post('/auth/register',{
        name,
        email,
        password
        });
        
      console.log(data.msg);

      setSend(false);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registro de datos exitoso',
        text: data.msg,
        showConfirmButton: false,
        timer: 5000
      })

      reset()

    } catch (error) {
      console.log(error);
      handleShowAlert(error.response?.data.msg);
      reset();
      setSend(true)
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
      <h1 className="text-sky-600 font-black text-3xl capitalize">
        Creá tu cuenta y administra tus{" "}
        <span className="text-slate-600">proyectos</span>
      </h1>

      {
        alert.msg && <Alert {...alert} />
      }

      <form className="my-10 p-8 bg-white rounded-lg border shadow-lg"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="name"
            className="text-gray-400 block font-
bold"
          >
            Usuario
          </label>
          <input
            id="name"
            type="text"
            placeholder="Ingresá tu nombre"
            className="w-full mt-3 p-3 border rounded"
            value={name}
            name="name"
            onChange={handleInputChange}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="email"
            className="text-gray-400 block font-bold"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingresá tu email"
            className="w-full mt-3 p-3 border rounded"
            value={email}
            name="email"
            onChange={handleInputChange}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="text-gray-400 block font-
bold"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            className="w-full mt-3 p-3 border rounded"
            value={password}
            name="password"
            onChange={handleInputChange}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="text-gray-400 block font-
bold"
          >
            Confirma tu contraseña
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Ingrese su contraseña"
            className="w-full mt-3 p-3 border rounded"
            value={password2}
            name="password2"
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="bg-sky-700 w-full py-3 text-white uppercase font-sans
                      rounded hover:bg-sky-800 transition-colors mb-4 disabled:bg-slate-400" 
                      disabled = {send}
        >
          Crear cuenta
        </button>
        {
        alert.msg && <Alert {...alert} />
      }
      </form>

      <nav className="md:flex md:justify-between">
        <Link
          to={"/"}
          className=" text-sky-700 block text-center my-3 text-sm uppercase "
        >
          ¿Estás registrado? Iniciá sesión
        </Link>
        <Link
          to={"/forget-password"}
          className=" text-sky-700 block text-center my-3 text-sm uppercase "
        >
          Olvidé mi password
        </Link>
      </nav>
    </>
  );
};
