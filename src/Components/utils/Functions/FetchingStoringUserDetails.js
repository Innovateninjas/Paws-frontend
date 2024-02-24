import axios from "axios";

export async function fetchAndStoreUserDetails() {
    const csrftoken = localStorage.getItem('csrftoken');
    if (!csrftoken) {
        return;
    }

    try {
        const response = await axios.get('https://aniresfr-backend.vercel.app/user', {
            headers: {
                'Authorization': `Token ${csrftoken}`,
            },
            withCredentials: true
        });
        // Store userData in local storage
        localStorage.setItem('userData', JSON.stringify(response.data));
        
    } catch (error) {
        console.error('Error fetching user data:', error.message);
    }
}
