import React, { useRef} from "react";
import {MapContainer, TileLayer,useMap} from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import "leaflet/dist/leaflet.css"
import RoutingMachine from "./RoutingMachine";
import useStopsState from "../../hooks/useStopsState";




function Maps(schedule) {
    const position = [42.73919,23.29086];
    const scheduleId = schedule.stop_location
    const rMachine = useRef();
    const [stops, setStops] = useStopsState(scheduleId);



    let  waypoint = stops.map(function(dataPoint){
        // It might be useful to inspect these values
            return [parseFloat(dataPoint.latitude), parseFloat(dataPoint.longitude)];
    });



    const ResizeMap = () => {
        const map = useMap();
        map._onResize();
        return null;
    };

            return (

                <MapContainer
                    className="map"
                    center={position}
                    minZoom={11}
                    zoom={12}
                    style={{height: 310, width: "100%"}}

                >

                    <ResizeMap/>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {stops.length > 0 && (
                        <RoutingMachine

                        zoom={12} ref={rMachine} waypoints={waypoint}
                        />
                        )}

                </MapContainer>

            );


}

export default Maps;