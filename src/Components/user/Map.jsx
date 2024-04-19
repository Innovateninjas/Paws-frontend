import React, { useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // docs link https://react-leaflet.js.org/docs/start-introduction/
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map = ({ zoom = 13, customCenter }) => {
    // Generate a unique key whenever customCenter changes
    const [key, setKey] = useState(0);
    const [location, setLocation] = useState(null);

    // Update the key whenever customCenter changes
    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [customCenter]);

    // Get current location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation([position.coords.latitude, position.coords.longitude]);
        });
    }, []);

    return (
        <div className="map-container w-full h-full">
            <MapContainer className='w-[335px] h-full flex flex-col items-center justify-center rounded-lg'
                key={key}
                center={customCenter || location}
                zoom={zoom}
                attributionControl={false}
                preferCanvas={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; Pawss"
                />
                {location && (
                    <Marker position={location}>
                        <Popup>
                        The animal is here!~
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

Map.propTypes = {
    zoom: PropTypes.number,
    customCenter: PropTypes.array,
};

export default Map;