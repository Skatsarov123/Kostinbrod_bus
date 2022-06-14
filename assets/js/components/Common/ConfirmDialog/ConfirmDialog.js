import { Modal, Button } from 'react-bootstrap';
import React from 'react';
const ConfirmDialog = ({
    show,
    onClose,
    onSave,
}) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Сигурни ли сте, че искате да изтриете.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Не</Button>
                <Button variant="primary" onClick={onSave}>Да</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDialog;
