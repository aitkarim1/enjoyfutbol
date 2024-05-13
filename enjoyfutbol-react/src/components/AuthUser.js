import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});

    // const [auth, setAuth] = useState({
    //     token: localStorage.getItem('token'),
    //     isLoggedIn: false
    // });

    // useEffect(() => {
    //     // Actualizar el estado de isLoggedIn en función de si hay token
    //     setAuth(prev => ({
    //         ...prev,
    //         isLoggedIn: !!localStorage.getItem('token')
    //     }));
    // }, []);

    useEffect(() => {
        const fetchUser = async () => {
            // try {
            //     const response = await fetch('http://localhost:8000/api/user', {
            //         headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Requested-With': 'XmlHttpRequest'},
            //         credentials: 'include',
                    
            //     });
            //     const contentType = response.headers.get('content-type');
            //     if (contentType && contentType.includes('application/json')) {
            //         const userData = await response.json();
            //         setUser({
            //             id: userData.id,
            //             name: userData.name,
            //             email: userData.email
            //         });
            //     } else {
            //         console.error("Usuario no autenticado")
            //         if(user.length > 0) {
            //             console.log(user)
            //         } else {
            //             console.log("aaaaa")
            //         }
            //     }
            // } catch (error) {
            //     console.error('Error fetching user data:', error);
            // }
        };

        fetchUser();
    }, []);

    // const login = async (credentials) => {
    //     const response = await fetch('http://localhost:8000/api/login', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(credentials),
    //     });
    //     const data = await response.json();
    //     if (data.access_token) {
    //         localStorage.setItem('token', data.access_token);
    //         setAuth({ token: data.access_token, isLoggedIn: true });
    //     }
    // };

    // const logout = () => {
    //     localStorage.removeItem('token');
    //     setAuth({ token: null, isLoggedIn: false });
    // };

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
