import React, {useRef} from "react";
import {MapContainer,TileLayer, useMap} from "react-leaflet";
import RoutingMachine from "./RoutingMachine";
import useStopsState from "../../hooks/useStopsState";
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

function Maps(schedule) {
    const position = [42.73919, 23.29086];
    const scheduleId = schedule.stop_location
    const rMachine = useRef();
    const [stops, setStops] = useStopsState(scheduleId);
    let waypoint = stops.map(function (dataPoint) {
        return [parseFloat(dataPoint.latitude), parseFloat(dataPoint.longitude)];
    });

    const icon = L.icon({
        iconRetinaUrl:iconRetina,
        iconUrl: iconMarker,
        shadowUrl: iconShadow
    });

    const ResizeMap = () => {
        const map = useMap();
        map._onResize();
        return null;
    };
    return (
        <MapContainer

            icon={icon}
            className="map"
            center={position}
            minZoom={1}
            zoom={12}
            style={{height: 500, width:1024}}
        >
            <ResizeMap/>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {stops.length > 0 && (
                <RoutingMachine zoom={12} ref={rMachine} waypoints={waypoint}/>
            )}
        </MapContainer>
    );
}
export default Maps;