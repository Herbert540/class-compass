import React, { useState, useEffect } from 'react';
import { useDbUpdate } from '../utilities/firebase';

const CourseForm = ({ courseKey, course, onCancel, onSubmit }) => {
  const [title, setTitle] = useState(course.title || '');
  const [meets, setMeets] = useState(course.meets || '');
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [updateData, result] = useDbUpdate(`/courses/${courseKey}`);

  const meetingTimePattern = /^[MTWFS]+ \d{1,2}:\d{2}-\d{1,2}:\d{2}$/;

  const validateForm = () => {
    const newErrors = {};

    if (title.length < 2) {
      newErrors.title = 'Course title must be at least 2 characters long.';
    }

    if (meets && !meetingTimePattern.test(meets)) {
      newErrors.meets = 'Meeting time must contain days and start-end times, e.g., MWF 12:00-13:20.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Compare initial course data with current form state to track changes
  useEffect(() => {
    if (title !== course.title || meets !== course.meets) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [title, meets, course.title, course.meets]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedCourse = { title, meets };
      updateData(updatedCourse); 
      onSubmit(); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Course Title</label>
        <input
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter course title"
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="meets" className="form-label">Meeting Times</label>
        <input
          type="text"
          className={`form-control ${errors.meets ? 'is-invalid' : ''}`}
          id="meets"
          value={meets}
          onChange={(e) => setMeets(e.target.value)}
          placeholder="Enter meeting times (e.g., MWF 9:00-9:50)"
        />
        {errors.meets && <div className="invalid-feedback">{errors.meets}</div>}
      </div>
      
      <button type="submit" className="btn btn-success me-2" disabled={!isChanged}>
        Submit
      </button>
      <button type="button" className="btn btn-danger" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default CourseForm;
