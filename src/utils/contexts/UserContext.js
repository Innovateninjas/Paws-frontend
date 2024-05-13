import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [key,setKey] = useState(0);
    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            const csrftoken = localStorage.getItem('csrftoken');
            if (!csrftoken) {
                setError('You are need be  logged in as a User.');
                setLoading(false);
                return;
            }
            const userType = localStorage.getItem('userType');
            if (userType === "ngo") {
                return
            }
            try {
                const url = process.env.REACT_APP_BACKEND_URL;
                const response = await axios.get(`${url}/info/user/`, {
                    headers: {
                        'Authorization': `Token ${csrftoken}`,
                    },
                    withCredentials: true
                });
                if (isMounted) {
                    setUserData(response.data);
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error.message);
                    setLoading(false);
                }
            }
        };
        if (localStorage.getItem("userType") === "ngo") {
            return
        } else {
            fetchData();

        }

        return () => {
            isMounted = false;
        };
    }, [key]);

    return (
        <UserContext.Provider value={{ userData, loading, error,setKey }}>
            {children}
        </UserContext.Provider>
    );
};
