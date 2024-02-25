import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

function MyComponent({ containerStyle, center, zoom }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBBUSExqFtg19K7UZQ4LzGE7MygnoxibRo"
    })

    // eslint-disable-next-line no-unused-vars
    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [center])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const mapOptions = {
        mapTypeId: 'satellite' // Set default map type to satellite
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={mapOptions} // Pass the map options here
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent);
