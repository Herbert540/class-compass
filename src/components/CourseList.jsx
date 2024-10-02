import React from 'react';

const CourseList = ({ courses, selectedCourses, toggleCourseSelection }) => (
  <div className="container mt-5">
    <div className="row">
      {Object.keys(courses).map(courseKey => {
        const course = courses[courseKey];
        const isSelected = selectedCourses.includes(courseKey);

        return (
          <div
            key={courseKey}
            className={`col-md-3 mb-4 ${isSelected ? 'selected-course' : ''}`}
            onClick={() => toggleCourseSelection(courseKey)}
            style={{ cursor: 'pointer' }}
          >
            <div className={`card h-100 ${isSelected ? 'bg-success text-white' : ''}`}
              style={{ transition: 'box-shadow 0.3s ease' }}
            >
              <div className="card-body">
                <h5 className="card-title">{course.term} CS {course.number}</h5>
                <p className="card-text">{course.title}</p>
              </div>
              <div className="card-footer text-muted">
                {course.meets}
                {isSelected && <i className="bi bi-check-circle ms-2"></i>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default CourseList;