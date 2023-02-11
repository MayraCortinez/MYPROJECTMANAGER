import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../hooks/useAuth';



export const ProtectedLayout = () => {

    const {auth, loading} = useAuth();  //   Traigo nombre/id del usuario, luego de que haya pasado la autenticación. (JWT)
    //console.log(auth)

        if (loading) {
           return <p> Cargando... </p>
        } 

    return (
        <>
        {
            auth._id ? (  //si el usuario está autenticado, entrará a las rutas privadas
            <div className='bg-indigo-50/50 m-auto'>
                <Header />
                    <div className='md:flex w-full'>
                        <Sidebar />
                        <main className='container w-full'>
                            <Outlet/>   
                        
                        </main>
                   
                    </div>
                    <Footer /> 
            </div>

            )
            : (
                <Navigate to='/'/>  // sino será dirigido al home
            )
        };
       
        </>
    )
}