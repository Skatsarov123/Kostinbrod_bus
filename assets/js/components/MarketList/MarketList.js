import MarketCard from "./MarketCard"
import React from "react";
const MarketList = ({
    markets
}) => {
    return (
        <>
            {markets.length > 0
                ? (
                    <ul className="other-markets-list" >

                        {markets.map(x => <MarketCard key={x._id} market={x} />)}
                    </ul>
                ) 
                : <p className="no-markets">No markets in database!</p>
            }
        </>
    );
}

export default MarketList;