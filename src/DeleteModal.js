import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function DeleteModal(props) {
    const {task, toggle, modal, deleteTask} = props;

    const okButtonHandler = () => {
        deleteTask(task._id);
        toggle();
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Are you sure want to delete <b>{task.name}</b>?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={okButtonHandler}>
                        OK
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default DeleteModal;