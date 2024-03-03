import axios from "axios"; 
function LandingPage() {
    async function increment() {
        const csrftoken = localStorage.getItem('csrftoken');
        try {
            const response = await axios.put(
                'https://aniresfr-backend.vercel.app/info/user/',
                {
                    no_reports: 69,
                },
                {headers: {
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
}