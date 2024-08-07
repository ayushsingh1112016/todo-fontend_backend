import React, { useState } from 'react';
import delSvg from './del.svg';
import editSvg from './edit.svg';
import '../App.css';

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [time, setTime] = useState(task.time);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      onUpdate(task.id, { ...task, title, time, description, status });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 flex items-center space-x-4">
      <div className="flex-shrink-0">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-gray-600"
          checked={status}
          onChange={() => setStatus(!status)}
        />
      </div>
      <div className="flex-1">
        {isEditing ? (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium text-gray-900 border border-gray-300 rounded-md p-1"
            />
            <input
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="text-sm text-gray-500 border border-gray-300 rounded-md p-1"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-sm text-gray-500 border border-gray-300 rounded-md p-1"
            />
          </>
        ) : (
          <>
            <div className="text-lg font-medium text-gray-900">{title}</div>
            <div className="text-sm text-gray-500">{time}</div>
            <div className="text-sm text-gray-500">{description}</div>
          </>
        )}
      </div>
      <div className="flex-shrink-0 flex space-x-2">
        <button onClick={handleDelete} className="p-2 rounded-md hover:bg-red-500 hover:svg-white">
          <img src={delSvg} className="logo" alt="Delete" />
        </button>
        <button onClick={handleEditToggle} className="p-2 rounded-md hover:bg-blue-500 hover:svg-white">
          <img src={editSvg} className="logo" alt="Edit" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
