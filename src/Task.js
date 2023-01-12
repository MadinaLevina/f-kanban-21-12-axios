import React, {useState} from 'react';
import DeleteModal from "./DeleteModal";
import ModalTask from "./ModalTask";

const Task = (props) => {
    const {task, changePriority, priorities, moveTask, statuses, deleteTask, updateTask} = props;

    const [modal, setModal] = useState(false);

    console.log(statuses)

    const toggle = () => setModal(!modal);


    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{task.name}</h5>
                <p className="card-text">{task.description}</p>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    Priority: {task.priority} {' '}
                    <button type="button"
                            className="btn btn-success btn-sm"
                            onClick={() => changePriority(task._id, +task.priority + 1)}
                            disabled={+task.priority === priorities[priorities.length - 1]}
                    >↑
                    </button>
                    {' '}
                    <button type="button"
                            className="btn btn-success btn-sm"
                            onClick={() => changePriority(task._id, +task.priority - 1)}
                            disabled={+task.priority === priorities[0]}
                    >↓
                    </button>

                </li>
                <li className="list-group-item">Status: {task.status}</li>
            </ul>

            <div className="card-body">
                <button type="button"
                        className="btn btn-outline-primary"
                        onClick={() => moveTask(task._id, task.status, -1)}
                        disabled={task.status === statuses.map(el => el.status)[0]}
                >←
                </button>

                <ModalTask buttonColor={"primary"}
                           buttonLabel={"Update"}
                           priorities={priorities}
                           statuses={statuses}
                           task={task}
                           updateTask={updateTask}
                />
                {/*<button type="button" className="btn btn-primary">Update</button>*/}

                <button type="button"
                        className="btn btn-danger"
                        onClick={toggle}
                >Delete
                </button>
                {modal && <DeleteModal task={task}
                                       modal={modal}
                                       toggle={toggle}
                                       deleteTask={deleteTask}
                />}

                <button type="button"
                        className="btn btn-outline-primary"
                        onClick={() => moveTask(task._id, task.status, 1)}
                        disabled={task.status === statuses.map(el => el.status)[statuses.length - 1]}
                >→
                </button>


            </div>
        </div>
    );
};

export default Task;