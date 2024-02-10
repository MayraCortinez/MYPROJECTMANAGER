import React, { createContext, useEffect, useState } from 'react';
import { clientAxios } from '../config/clientAxios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const authUser = async () => {

            const token = sessionStorage.getItem('token');
            if(!token){
                setLoading(false)
                return null
            }

            const config = {
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }

            try {
                const {data} = await clientAxios.get('/api/users/profile', config);
                //console.log(data.user)
                setAuth(data.user);
                
            } catch (error) {
                console.error(error.response?.data);
                sessionStorage.removeItem('token');
                
            } finally {
                setLoading (false)
            }
        }   
            authUser();
    }, [])
    

  return (
        <AuthContext.Provider
            value={
                {
                    auth,
                    setAuth,
                    loading                     // Información que queda a disposición de todos los componentes hijos
                }
            }
        >
            {children}

        </AuthContext.Provider>
  )
}


export default AuthContext;