const getUserLocation = async (setLatitude, setLongitude, setLocation) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            console.log(`latitude: ${latitude}, longitude: ${longitude}`);
            if (!setLocation) return;
            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
                );
                const data = await response.json();
                
                if (data.results && data.results.length > 0) {
                    const address = data.results[0].formatted_address;
                    setLocation(address);
                    console.log("Address:", address);
                } else {
                    console.log("No results found");
                }
            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        });
    }
};

export default getUserLocation;