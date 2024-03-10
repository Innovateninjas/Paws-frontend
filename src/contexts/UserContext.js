import React, { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                return;
            }
            try {
                const response = await axios.get('https://aniresfr-backend.vercel.app/info/user/', {
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
        if (localStorage.getItem("userType") !== "ngo") {
            fetchData();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({ userData, loading, error }), [userData, loading, error]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
