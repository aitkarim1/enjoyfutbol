import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Requested-With': 'XmlHttpRequest' },
                    credentials: 'include'
                });
                const userData = await response.json();
                console.log(userData.user)

                setUser(userData.user ? { // Verificar si userData.user está definido
                    id: userData.user.id,
                    name: userData.user.name,
                    email: userData.user.email,
                    sueldo: userData.user.sueldo,
                    genero: userData.user.genero,
                    fechaNacimiento: userData.user.fechaNacimiento,
                    nivel: userData.user.nivel,
                    numeroPartidos: userData.user.numeroPartidos,
                    role: userData.user.role
                } : false);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }

        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
