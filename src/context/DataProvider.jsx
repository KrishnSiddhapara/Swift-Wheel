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
                } catch (error) {
                    console.error('Error fetching profile', error);
                    localStorage.removeItem('token');
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
            if(data.role !== role) {
                throw new Error(`Account registered as ${data.role}, not ${role}`);
            }

            localStorage.setItem('token', data.token);
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
            setUser(data);
            return data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
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
