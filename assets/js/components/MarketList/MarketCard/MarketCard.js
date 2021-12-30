import { Link} from 'react-router-dom';
import {Table} from "react-bootstrap";
import React from "react";
const MarketCard = ({
    market
}) => {
    return (
        <Table >
            <thead>
            <tr>
                <th>Loading Date</th>
                <th>Loading Country</th>
                <th>Loading Town</th>
                <th>Unloading Country</th>
                <th>Unloading Town</th>
                <th>Distance</th>
                <th>price</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{market.loadingDate}</td>
                <td>{market.loadingCountry}</td>
                <td>{market.loadingTown}</td>
                <td>{market.unloadingCountry}</td>
                <th>{market.unloadingTown}</th>
                <th>{market.distanceInKm}</th>
                <th>{market.price}</th>
                <Link className="button" to={`/details/${market._id}`}>Details</Link>
            </tr>
            </tbody>
        </Table>
    );
}

export default MarketCard;