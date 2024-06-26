import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import Task from './Task';
import Category from './Category';
import Form from './Form';
import './style.css'; 

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState(['Work', 'Personal']);

    const addTask = task => {
        setTasks([...tasks, { ...task, id: tasks.length + 1, completed: false }]);
        if (!categories.includes(task.category)) {
            setCategories([...categories, task.category]);
        }
    };

    const toggleTask = taskId => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = taskId => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const addCategory = category => {
        setCategories([...categories, category]);
    };

    return (
        <Router>
            <div className="app">
                <Form addTask={addTask} categories={categories} addCategory={addCategory} />
                <div className="categories">
                    <NavLink to="/" activeClassName="active-category" className="category-link">
                        All Tasks
                    </NavLink>
                    {categories.map(category => (
                        <NavLink key={category} to={`/${category}`} activeClassName="active-category" className="category-link">
                            <Category category={category} />
                        </NavLink>
                    ))}
                </div>
                <Routes>
                    <Route path="/" element={<AllTasks tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />} />
                    {categories.map(category => (
                        <Route
                            key={category}
                            path={`/${category}`}
                            element={<FilteredTasks category={category} tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />}
                        />
                    ))}
                </Routes>
            </div>
        </Router>
    );
};

const FilteredTasks = ({ category, tasks, toggleTask, deleteTask }) => {
    const filteredTasks = tasks.filter(task => task.category === category);

    return (
        <div className="filtered-tasks">
            {filteredTasks.length === 0 ? (
                <p>No tasks available in this category.</p>
            ) : (
                filteredTasks.map(task => (
                    <Task key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
                ))
            )}
        </div>
    );
};

const AllTasks = ({ tasks, toggleTask, deleteTask }) => {
    return (
        <div className="filtered-tasks">
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                tasks.map(task => (
                    <Task key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
                ))
            )}
        </div>
    );
};

// NavLink to handle active link highlighting
const NavLink = ({ to, activeClassName, ...props }) => {
    const location = useLocation();
    const isActive = location.pathname === to || (location.pathname === '/' && to === '/');
    const className = isActive ? `${props.className} ${activeClassName}`.trim() : props.className;

    return <Link to={to} {...props} className={className} />;
};

export default App;
