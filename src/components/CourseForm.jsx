import React, { useState } from 'react';

const CourseForm = ({ course, onCancel }) => {
  const [title, setTitle] = useState(course.title || '');
  const [meets, setMeets] = useState(course.meets || '');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Course Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter course title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="meets" className="form-label">Meeting Times</label>
        <input
          type="text"
          className="form-control"
          id="meets"
          value={meets}
          onChange={(e) => setMeets(e.target.value)}
          placeholder="Enter meeting times (e.g., MWF 9:00-9:50)"
        />
      </div>
      <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default CourseForm;
