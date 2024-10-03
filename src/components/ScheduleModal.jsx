import React from 'react';

const ScheduleModal = ({ isOpen, closeModal, selectedCourses, courses }) => {
  if (!isOpen) return null;

  const hasSelectedCourses = selectedCourses.length > 0;

  return (
    <div className="modal show" style={{ display: 'block', backdropFilter: 'blur(5px)' }} tabIndex="-1" onClick={closeModal}>
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header justify-content-center">
            <h5 className="modal-title">Course Schedule</h5>
          </div>
          <div className="modal-body">
            {hasSelectedCourses ? (
              <div className="d-flex flex-column gap-2">
              {selectedCourses.map(courseKey => (
                <div key={courseKey} className="p-3 shadow-sm rounded border">
                  <strong>{courses[courseKey].term} CS {courses[courseKey].number}:</strong> {courses[courseKey].title} <br />
                  <small>{courses[courseKey].meets}</small>
                </div>
              ))}
            </div>
            ) : (
              <p>No courses selected. Please select courses from the list.</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
