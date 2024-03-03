import { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

function useIncrementer() {
    const { userData } = useContext(UserContext);

    async function increment(no_reports) {
        const csrftoken = localStorage.getItem('csrftoken');
        console.log(no_reports);
        try {
            const response = await axios.put(
                'https://aniresfr-backend.vercel.app/info/user/',
                {
                    no_reports: no_reports + 1,
                },
                {
                    headers: {
                        'Authorization': `Token ${csrftoken}`,
                    },
                    withCredentials: true,
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (userData !== null) {
            increment(userData.no_reports);
        }
    }, [userData]);

}

export default useIncrementer;
