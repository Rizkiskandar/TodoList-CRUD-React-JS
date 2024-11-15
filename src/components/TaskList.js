// TaskList.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

// TaskStatusIndicator component to display the spinning/loading status
const TaskStatusIndicator = ({ status }) => {
    const getStatusClass = () => {
        switch (status) {
            case 'To Do':
                return 'status-todo';
            case 'In Progress':
                return 'status-in-progress';
            case 'Done':
                return 'status-done';
            default:
                return '';
        }
    };

    return (
        <div className={`task-status-indicator ${getStatusClass()}`}>
            {status === 'Done' && <span>&#10003;</span>} {/* Display checkmark if done */}
        </div>
    );
};

// Main TaskList component to display the list of tasks
const TaskList = ({ tasks, deleteTask, showEditForm }) => (
    <div>
        {tasks.map((task, index) => (
            <Card className="task-card" key={index}>
                <Card.Body className="task-info">
                    <div>
                        <div className="task-label">Task</div>
                        <div className="task-name">{task.name}</div>
                    </div>
                    <div>
                        <div className="task-label">Priority</div>
                        <div className={`task-priority ${task.priority.toLowerCase()}`}>
                            {task.priority}
                        </div>
                    </div>
                    <div>
                        <div className="task-status">{task.status}</div>
                    </div>
                    <TaskStatusIndicator status={task.status} /> {/* Include the status indicator */}
                    <div className="d-flex">
                        <button className="icon-btn" onClick={() => showEditForm(task)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button className="icon-btn delete" onClick={() => deleteTask(task.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </Card.Body>
            </Card>
        ))}
    </div>
);

export default TaskList;
