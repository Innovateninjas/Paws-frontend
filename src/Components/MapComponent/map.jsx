import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * Renders a styled map using React Leaflet.
 * @param {Object} props - The props for the component.
 * @param {number} [props.zoom=13] - The zoom level of the map.
 * @param {number[]} [props.center=[22.5726, 88.3639]] - The center coordinates of the map in [latitude, longitude] format.
 * @returns {JSX.Element} A React component representing the  map.
 */

const Map = ({ zoom = 13, center = [22.5726, 88.3639] }) => {
    return (
        <div className="map-container">
            <MapContainer
                center={center}
                zoom={zoom}
                style={{
                    width: '100%',
                    height: '16vh',
                    borderRadius: '10px',
                    border: "3px solid #0a6d06",
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="paws"
                />
            </MapContainer>
        </div>
    );
};

Map.propTypes = {
    zoom: PropTypes.number,
    center: PropTypes.arrayOf(PropTypes.number),
};

export default Map;
