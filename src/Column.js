import React from 'react';
import Task from "./Task";

const Column = (props) => {
    const {status, tasks, changePriority, priorities, moveTask, statuses, deleteTask, updateTask} = props;

    return (

        <div className="col">
            <h2>
            {status.title}
            </h2>
            {tasks.filter(el => el.status === status.title).map(el => (
                <Task key={el._id}
                      task={el}
                      changePriority={changePriority}
                      priorities={priorities}
                      moveTask={moveTask}
                      statuses={statuses}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                />
            ))}
        </div>
    );
};

export default Column;