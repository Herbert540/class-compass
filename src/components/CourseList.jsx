import React from 'react';

const CourseList = ({ courses }) => (
    <div className="container mt-5">
      <div className="row">
        {Object.keys(courses).map(courseKey => {
          const course = courses[courseKey];
          return (
            <div key={courseKey} className="col-md-3 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{course.term} CS {course.number}</h5>
                  <p className="card-text">{course.title}</p>
                </div>
                <div className="card-footer text-muted">
                  {course.meets}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

export default CourseList;