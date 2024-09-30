import React from 'react';

const CourseList = ({ courses }) => (
    <div>
        {Object.keys(courses).map(courseKey => {
            const course = courses[courseKey];
            return (
                <div key={courseKey}>
                    <h2>{course.term} {course.number}: {course.title}</h2>
                    <p>Meets: {course.meets}</p>
                </div>
            );
        })}
    </div>
);

export default CourseList;