import React from "react";
import { useNavigate } from 'react-router-dom';
import * as marketService from '../../services/marketService';
import { useAuthContext } from '../../contexts/AuthContext';
import {Form, Row, Col, Button} from "react-bootstrap";
const Create = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const onMarketCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let loadingDate = formData.get('loadingDate');
        let loadingCountry = formData.get('loadingCountry');
        let loadingTown = formData.get('loadingTown');
        let loadingZip = formData.get('loadingZip');
        let loadingStreet = formData.get('loadingStreet');
        let unloadingCountry = formData.get('unloadingCountry');
        let unloadingTown = formData.get('unloadingTown');
        let unloadingZip = formData.get('unloadingZip');
        let unloadingStreet = formData.get('unloadingStreet');
        let distanceInKm = formData.get('distanceInKm');
        let price = formData.get('price');
        marketService.create({
            loadingDate,
            loadingCountry,
            loadingTown,
            loadingZip,
            loadingStreet,
            unloadingCountry,
            unloadingTown,
            unloadingZip,
            unloadingStreet,
            distanceInKm,
            price

        }, user.token)
            .then(result => {
                navigate('/dashboard');
            })
    }

    return (
        <Form onSubmit={onMarketCreate} method="POST">
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Loading Date</Form.Label>
                    <Form.Control  type="loadingDate" name="loadingDate" id="loadingDate" placeholder="22/12/2021" />
                </Form.Group>

            <Form.Group as={Col} >
                <Form.Label>Loading Country</Form.Label>
                <Form.Control type="loadingCountry" name="loadingCountry" id="loadingCountry" placeholder="Bulgaria...." />
            </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Loading Town</Form.Label>
                    <Form.Control  type="loadingTown" name="loadingTown" id="loadingTown" placeholder="Sofia...." />
                </Form.Group>
            </Row>
            <Row className="mb-3">

                <Form.Group as={Col} >
                    <Form.Label>Loading Zip</Form.Label>
                    <Form.Control  type="loadingZip" name="loadingZip" id="loadingZip" placeholder="1000" />
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Loading Street</Form.Label>
                    <Form.Control  type="loadingStreet" name="loadingStreet" id="loadingStreet" placeholder="Street 123 " />
                </Form.Group>
                <div><br/></div>
            </Row>
            <div><hr/></div>
            <div><br/></div>
            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Unloading Country</Form.Label>
                    <Form.Control  type="unloadingCountry" name="unloadingCountry" id="unloadingCountry" placeholder="Bulgaria...." />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Unloading Town</Form.Label>
                    <Form.Control  type="unloadingTown" name="unloadingTown" id="unloadingTown" placeholder="Burgas" />
                </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Unloading Zip</Form.Label>
                        <Form.Control type="unloadingZip" name="unloadingZip" id="unloadingZip" placeholder="8000"/>
                    </Form.Group>
                </Row>
            <Row className="mb-3">
            <Form.Group as={Col} >
                <Form.Label>Unloading Street</Form.Label>
                <Form.Control type="unloadingStreet" name="unloadingStreet" id="unloadingStreet" placeholder="Street 23" />
            </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Distance</Form.Label>
                    <Form.Control type="distance" name="distanceInKm" id="distanceInKm" placeholder="400km" />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>Price</Form.Label>
                    <Form.Control  type="price" name="price" id="price" placeholder="152.40" />
                </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>
    );
}

export default Create;