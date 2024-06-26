import React from 'react';

const Task = ({ task, toggleTask, deleteTask }) => {
    const { id, text, completed } = task;

    const handleToggle = () => {
        toggleTask(id);
    };

    const handleDelete = (e) => {
        e.stopPropagation(); 
        deleteTask(id);
    };

    return (
        <div className={`task ${completed ? 'completed' : ''}`} onClick={handleToggle}>
            <span>{text}</span>
            <button onClick={handleDelete} className="delete-button">🗑️</button>
        </div>
    );
};

export default Task;
