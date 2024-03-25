import React, { useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer } from 'react-leaflet'; // docs link https://react-leaflet.js.org/docs/start-introduction/
import 'leaflet/dist/leaflet.css';

const Map = ({ zoom = 13, customCenter }) => {
    // Generate a unique key whenever customCenter changes
    const [key, setKey] = useState(0);

    // Update the key whenever customCenter changes
    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [customCenter]);

    return (
        <div className="map-container w-full h-full">
            <MapContainer className='w-[335px] h-full flex flex-col items-center justify-center rounded-lg'
                key={key}
                center={customCenter}
                zoom={zoom}
                attributionControl={false}
                preferCanvas={false}
                
            >
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="&copy; Pawss"
                />
            </MapContainer>
        </div>
    );
};

Map.propTypes = {
    zoom: PropTypes.number,
    customCenter: PropTypes.arrayOf(PropTypes.number),
};

export default Map;
