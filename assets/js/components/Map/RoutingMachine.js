import L from "leaflet";
import {createControlComponent} from "@react-leaflet/core";
import "leaflet-routing-machine";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import React from "react";


const createRoutineMachineLayer = (props) => {

    const icon = L.icon({
        iconUrl:
            "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
        iconSize: [40, 40]
    });

    const {waypoints} = props;
    const instance = L.Routing.control({

        waypoints: waypoints,
        lineOptions: {
            styles: [{color: "#6FA1EC", weight: 4,}]
        },
        icon:icon,
        show: false,
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        extendToWaypoints: true,
        missingRouteTolerance: 10,
    })
    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;