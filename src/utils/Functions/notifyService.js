import { getToken } from "firebase/messaging";
import { messaging } from '../../firebase';
import axios from 'axios';

const csrftoken = localStorage.getItem('csrftoken');

const requestPermission = async () => {
    if (!csrftoken) {
        return;
    }

    try {
        const permission = await Notification.requestPermission();
        if ((permission === "granted" || permission === "default" || permission === "denied") && csrftoken) {
            const notify_token = await getToken(messaging, {
                vapidKey: process.env.REACT_APP_VAPID_KEY,
            });

            const url = process.env.REACT_APP_BACKEND_URL;
            const response = await axios.post(`${url}/update_token`, { token: notify_token }, {
                headers: {
                    'Authorization': `Token ${csrftoken}`
                },
            });
            console.log(response.data);
        } else if (permission === "denied") {
            localStorage.setItem("notification", "denied");
        } else {
            localStorage.setItem("notification", "default");
        }
    } catch (error) {
        console.error(error);
    }
}

export default requestPermission;
