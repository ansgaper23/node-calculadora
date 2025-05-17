
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('electroProUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@example.com' && password === 'password123') {
          const userData = { id: '1', email: email, name: 'Usuario de Prueba' };
          localStorage.setItem('electroProUser', JSON.stringify(userData));
          setUser(userData);
          resolve(userData);
        } else {
          const users = JSON.parse(localStorage.getItem('electroProRegisteredUsers') || '[]');
          const foundUser = users.find(u => u.email === email && u.password === password);
          if (foundUser) {
            const userData = { id: foundUser.id, email: foundUser.email, name: `Usuario ${foundUser.id}` };
            localStorage.setItem('electroProUser', JSON.stringify(userData));
            setUser(userData);
            resolve(userData);
          } else {
            reject(new Error('Credenciales incorrectas. Por favor, verifica tu email y contraseña.'));
          }
        }
      }, 1000);
    });
  };

  const register = async (email, password) => {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = JSON.parse(localStorage.getItem('electroProRegisteredUsers') || '[]');
        if (users.find(u => u.email === email)) {
          reject(new Error('Este correo electrónico ya está registrado.'));
          return;
        }
        const newUser = { id: Date.now().toString(), email, password };
        users.push(newUser);
        localStorage.setItem('electroProRegisteredUsers', JSON.stringify(users));
        resolve(newUser);
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('electroProUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
