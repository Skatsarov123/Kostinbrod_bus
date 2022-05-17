import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import React from "react";





const createRoutineMachineLayer = (props) => {

    const { waypoints } = props;

    const points1 = [
        [42.741173797992744,  23.28697396123882],
        [42.80967488362432, 23.21687124840545]
    ];





    // console.log(waypoints)

    const instance = L.Routing.control({


        waypoints:  waypoints,
            // L.latLng(42.741173797992744, 23.28697396123882),
            // L.latLng(42.80967488362432, 23.21687124840545),



        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },

        show: false,
        addWaypoints: true,
        routeWhileDragging: true,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        extendToWaypoints: true,
        missingRouteTolerance: 10,

    })


      // console.log(instance)
    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;