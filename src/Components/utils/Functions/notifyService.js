import { getToken } from "firebase/messaging";
import { messaging } from '../../../firebase';
import axios from 'axios';

const csrftoken = localStorage.getItem('csrftoken');

const requestPermission = async () => {
    if (localStorage.getItem("notification") === "denied") {
        return;
    }
    if (!csrftoken) {
        return;
    }

    try {
        const permission = await Notification.requestPermission();
        if ((permission === "granted" || permission === "default") && csrftoken) {
            const notify_token = await getToken(messaging, {
                vapidKey: "BD0HK5CJxMLWdQc6Xs8E101d-LWReKCl-o8pC2e0eyMhw4go6mO2cwvp8U2wrxOGkkwPYVAs73nQkOBl0okrft8",
            });
            
            console.log(csrftoken)
            const response = await axios.post('https://aniresfr-backend.vercel.app/update_token', { token: notify_token }, {
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
