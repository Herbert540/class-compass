import React, { useState } from 'react';
import { isCourseConflicting } from '../utilities/timeConflicts';
import CourseForm from './CourseForm';

const CourseList = ({ courses, selectedCourses, toggleCourseSelection }) => {
  const [editingCourse, setEditingCourse] = useState(null);

  const handleEdit = (course) => {
    setEditingCourse(course);
  };

  const handleCancel = () => {
    setEditingCourse(null);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {editingCourse ? (
          <div className="col-12">
            <CourseForm course={editingCourse} onCancel={handleCancel} />
          </div>
        ) : (
          Object.keys(courses).map(courseKey => {
            const course = courses[courseKey];
            const isSelected = selectedCourses.includes(courseKey);
            const isConflicting = !isSelected && isCourseConflicting(course, selectedCourses, courses);

            return (
              <div
                key={courseKey}
                className={`col-md-3 mb-4 ${isSelected ? 'selected-course' : ''} ${isConflicting ? 'disabled-course' : ''}`}
                onClick={() => !isConflicting && toggleCourseSelection(courseKey)}
                style={{ cursor: isConflicting ? 'not-allowed' : 'pointer' }}
              >
                <div className={`card h-100 ${isSelected ? 'bg-success text-white' : ''} ${isConflicting ? 'bg-danger text-white' : ''}`}
                  style={{ transition: 'box-shadow 0.3s ease' }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{course.term} CS {course.number}</h5>
                    <p className="card-text">{course.title}</p>
                  </div>
                  <div className="card-footer text-muted d-flex justify-content-between align-items-center">
                    <span>
                      {course.meets}
                      {isSelected && <i className="bi bi-check-circle ms-2"></i>}
                      {isConflicting && <span className="text-white ms-2">x</span>}
                    </span>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(course);
                      }}
                    >
                      <i className="bi bi-pencil-square"></i> Edit
                    </button>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CourseList;