import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const Data = createContext();

export const DataProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await api.get('/auth/profile');
                    setUser(data);
                    if (data.role) {
                        localStorage.setItem('role', data.role);
                    }
                } catch (error) {
                    console.error('Error fetching profile', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                }
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    const login = async (email, password, role) => {
        try {
            const { data } = await api.post('/auth/login', { email, password, role });

            // Enforce strict role matching so users cannot impersonate admins
            if (data.role !== role) {
                throw new Error(`Account registered as ${data.role}, not ${role}`);
            }

            console.log('data : ', data);
            localStorage.setItem('token', data.token);
            if (data.role) localStorage.setItem('role', data.role);
            setUser(data);
            return data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const googleLogin = async (token, role) => {
        try {
            const { data } = await api.post('/auth/google', { token, role });
            
            if (data.role !== role) {
                throw new Error(`Account registered as ${data.role}, not ${role}`);
            }

            localStorage.setItem('token', data.token);
            if (data.role) localStorage.setItem('role', data.role);
            setUser(data);
            return data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await api.post('/auth/register', userData);
            localStorage.setItem('token', data.token);
            if (data.role) localStorage.setItem('role', data.role);
            setUser(data);
            return data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        googleLogin,
        register,
        logout
    };

    return (
        <Data.Provider value={value}>
            {!loading && children}
        </Data.Provider>
    );
};

export const useData = () => {
    const context = useContext(Data);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
