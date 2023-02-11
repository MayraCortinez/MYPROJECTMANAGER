import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

export const Header = () => {
  
  const navigate = useNavigate()
  const {auth, setAuth} = useAuth();

  const closeSession = () => {
    sessionStorage.removeItem('token');
    setAuth({})
    navigate('/')
}

  return (


      <div className="px-4 py-5 bg-white border-b">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <p className="text-4xl text-violet-900 font-black md:w-1/4 pb-5">Projects Manager 
          <h2 className=" text-violet-900/50 p-5">Hola {auth.name} !
            </h2>
          </p>

          <div className='flex flex-col md:flex-row justify-center rounded-lg gap-2'>
          <input type="text" placeholder="Buscar proyecto..." className=" p-2 bg-indigo-100 rounded-lg text-violet-900 font-bold"/>
          <img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/36/null/external-search-interface-kiranshastry-gradient-kiranshastry.png" className="bg-indigo-100 rounded-lg p-2 border cursor-pointer" />
          </div>
              <button
              type="button"
              onClick={closeSession} 
              className="text-violet-600 text-sm bg-pink-300/50 p-2 rounded uppercase font-bold  hover:bg-pink-400/50 "
              >
                <img src="https://img.icons8.com/nolan/64/exit.png" className='flex place-items-center'/>
                  Cerrar sesión
              </button>
          </div>
      </div>



  )
}

