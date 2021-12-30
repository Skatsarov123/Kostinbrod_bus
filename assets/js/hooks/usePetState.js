import { useState, useEffect, useMemo } from 'react';
import * as marketService from '../services/marketService';

const usePetState = (marketId) => {
    const [market, setMarket] = useState({});

    const controller = useMemo(() => {
        const controller = new AbortController();

        return controller;
    }, [])

    useEffect(() => {
        marketService.getOne(marketId, controller.signal)
            .then(marketResult => {
                setMarket(marketResult);
            })

        return () => {
            controller.abort();
        }
    }, [marketId, controller]);

    return [
       market,
        setMarket
    ]
};

export default usePetState;