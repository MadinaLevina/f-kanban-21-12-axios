import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Column from "./Column";
import ModalTask from "./ModalTask";


function App() {

    const [statuses, setStatuses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const priorities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


    const getStatuses = () => {
        axios.get('https://expressjs-server.up.railway.app/statuses')
            .then((res) => {
                setStatuses(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    };
    const getTasks = () => {
        axios.get('https://expressjs-server.up.railway.app/tasks')
            .then((res) => {
                setTasks(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const addNewTask = (newTask) => {
        axios.post(`https://expressjs-server.up.railway.app/tasks`, newTask)
            .then((res) => {
                getTasks();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const updateTask = (updatedTask) => {
        axios.patch(`https://expressjs-server.up.railway.app/tasks/${updatedTask._id}`, updatedTask)
            .then((res) => {
                getTasks();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const moveTask = (id, status, direction) => {
        const statusesArray = statuses.map(el => el.status);
        const currentIndex = statusesArray.indexOf(status);
        let newStatus = statusesArray[currentIndex + direction];
        axios.patch(`https://expressjs-server.up.railway.app/tasks/${id}`, {status: newStatus})
            .then(res => {
                getTasks()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const changePriority = (id, priority) => {
        axios.patch(`https://expressjs-server.up.railway.app/tasks/${id}`, {priority})
            .then(res => {
                getTasks()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteTask = (id) => {
        axios.delete(`https://expressjs-server.up.railway.app/tasks/${id}`)
            .then(res => {
                getTasks()
            })
            .catch(err => {
                console.log(err)
            })

    }


    useEffect(() => {
        getStatuses();
        getTasks();
    }, []);


    console.log(tasks);

    return (
        <div className="App">
            <h1>Kanban and Axios</h1>
            <ModalTask buttonColor={"danger"}
                       buttonLabel={"Create New Task"}
                       priorities={priorities}
                       statuses={statuses}
                       addNewTask={addNewTask}
            />

            <div className="container text-center">
                <div className="row align-items-start">
                    {statuses.map(el => (
                        <Column key={el._id}
                                tasks={tasks}
                                status={el}
                                changePriority={changePriority}
                                priorities={priorities}
                                moveTask={moveTask}
                                statuses={statuses}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                        />
                    ))}
                </div>
            </div>


        </div>
    );
}

export default App;
