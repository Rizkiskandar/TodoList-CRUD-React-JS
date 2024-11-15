import React, { useState } from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskFrom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setTaskToEdit(null);
    };

    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now() }]);
    };

    const editTask = (updatedTask) => {
        setTasks(tasks.map((task) => task.id === updatedTask.id ? updatedTask : task));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const showEditForm = (task) => {
        setTaskToEdit(task);
        handleShowForm();
    };


    // Function to handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter tasks based on search query
    const filteredTasks = tasks.filter(task => 
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container className="my-5">
            <h1 className="mb-4">Task List</h1>
            <Row className="mb-4 align-items-center">
                <Col>
                    <Form.Control 
                        type="text" 
                        placeholder="Search tasks..." 
                        value={searchQuery} 
                        onChange={handleSearchChange} 
                    />
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="primary" onClick={handleShowForm}>Add Task</Button>
                </Col>
            </Row>
            <div>
                <TaskList tasks={filteredTasks} deleteTask={deleteTask} showEditForm={showEditForm} />
                <TaskForm
                    show={showForm}
                    handleClose={handleCloseForm}
                    addTask={addTask}
                    editTask={editTask}
                    taskToEdit={taskToEdit}
                />
            </div>
        </Container>
    );
}

export default App;