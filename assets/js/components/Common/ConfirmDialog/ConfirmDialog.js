import {Button, Modal} from 'react-bootstrap';
import React from 'react';

const ConfirmDialog = ({show, onClose, onSave,}) => {
    return (


                    <Modal show={show} onHide={onClose}>
                        <Modal.Dialog className="flex justify-center content-center my-auto border-4  ">
                        <Modal.Header  closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>

                        <Modal.Body >
                            <p className="mb-5 text-lg font-normal text-gray-500  dark:text-gray-400">Сигурни ли сте, че искате да изтриете.</p>
                        </Modal.Body>

                        <Modal.Footer className="p-6 text-center">
                            <Button
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                onClick={onClose}>Не</Button>
                            <Button
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                onClick={onSave}>Да</Button>
                        </Modal.Footer>
                        </Modal.Dialog>
                    </Modal>


    );
};

export default ConfirmDialog;
