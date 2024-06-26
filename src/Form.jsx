import React, { useState } from 'react';

const Form = ({ addTask, categories, addCategory }) => {
    const [taskText, setTaskText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');

    const handleChangeText = e => {
        setTaskText(e.target.value);
    };

    const handleChangeCategory = e => {
        setSelectedCategory(e.target.value);
    };

    const handleChangeNewCategory = e => {
        setNewCategory(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (taskText.trim() && selectedCategory) {
            addTask({ text: taskText, category: selectedCategory });
            setTaskText('');
            setSelectedCategory('');
        }
    };

    const handleAddCategory = e => {
        e.preventDefault();
        if (newCategory.trim()) {
            addCategory(newCategory);
            setSelectedCategory(newCategory);
            setNewCategory('');
        }
    };

    return (
        <div className="input-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="taskText">Add Task:</label>
                    <input
                        type="text"
                        id="taskText"
                        value={taskText}
                        onChange={handleChangeText}
                        placeholder="Enter task"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select id="category" value={selectedCategory} onChange={handleChangeCategory}>
                        <option value="">Select category</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                        <option value="add-new">Add new category</option>
                    </select>
                </div>
                {selectedCategory === 'add-new' && (
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="New category"
                            value={newCategory}
                            onChange={handleChangeNewCategory}
                        />
                        <div className="button-group">
                            <button onClick={handleAddCategory}>Add Category</button>
                            <button type="submit">Add Task</button>
                        </div>
                    </div>
                )}
                {selectedCategory !== 'add-new' && (
                    <div className="button-group">
                        <button type="submit">Add Task</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Form;
