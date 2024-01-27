const checkLoginStatus =  () => {
    try {
        // Check if the user is logged in by verifying the presence of a CSRF token in localStorage
        const token = localStorage.getItem("csrftoken");
        if (!token) {
            // If not logged in, return false
            return false;
        } else {
            // If logged in, return true
            return true;
        }
    } catch (error) {
        // Handle errors
        console.error("An error occurred while checking login status:", error);
        return false;
    }
};

export default checkLoginStatus;