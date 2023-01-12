import React, { useState } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input} from 'reactstrap';

function ModalTask(props) {
    const {priorities, statuses, addNewTask, buttonColor, buttonLabel, task, updateTask} = props;

    const [modal, setModal] = useState(false);
    const [name, setName] = useState(buttonLabel === 'Update' ? task.name : '');
    const [description, setDescription] = useState(buttonLabel === 'Update' ? task.description : '');
    const [priority, setPriority] = useState(buttonLabel === 'Update' ? task.priority : priorities[0]);
    const [status, setStatus] = useState(buttonLabel === 'Update' ? task.status : statuses[0]?.status);

const addTaskButtonHandler = () => {
    const newTask = {
        name,
        description,
        status,
        priority,
    }
    buttonLabel === 'Update' ? updateTask({...newTask, _id: task._id}) : addNewTask(newTask);

    toggle();
}


    const toggle = () => {
        setModal(!modal)
        setName(buttonLabel === 'Update' ? task.name : '')
        setDescription(buttonLabel === 'Update' ? task.description : '')
        setPriority(buttonLabel === 'Update' ? task.priority : priorities[0])
        setStatus(buttonLabel === 'Update' ? task.status : statuses[0]?.status)
    };

    return (
        <>
            <Button color={buttonColor} onClick={toggle}>
                {buttonLabel}
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{buttonLabel}</ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <Input placeholder="task name"
                               value={name}
                               onChange={e => setName(e.target.value)}
                        />
                    </InputGroup>
<br/>
                    <InputGroup>
                        <Input placeholder="task description"
                               value={description}
                               onChange={e => setDescription(e.target.value)}
                        />
                    </InputGroup>
<br/>
                    <div className="form-floating">
                        <select className="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                value={priority}
                                onChange={e => setPriority(e.target.value)}
                        >
                            {priorities.map((el, i)=>
                            <option key={i} value={el}>{el}</option>
                            )}
                        </select>
                        <label htmlFor="floatingSelect">Choose Priority</label>
                    </div>

                    <br/>
                    <div className="form-floating">
                        <select className="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                        >
                            {statuses.map((el)=>
                                <option key={el._id} value={el.status}>{el.status}</option>
                            )}
                        </select>
                        <label htmlFor="floatingSelect">Choose Status</label>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={addTaskButtonHandler}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ModalTask;

