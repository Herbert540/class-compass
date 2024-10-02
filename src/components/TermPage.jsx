import React, { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';

const TermPage = ({ courses }) => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');

  const getCoursesByTerm = (courses, term) => {
    return Object.keys(courses).filter(courseKey => courses[courseKey].term === term);
  };

  const buildFilteredCourses = (courseKeys, courses) => {
    return courseKeys.reduce((filteredCourses, courseKey) => {
      filteredCourses[courseKey] = courses[courseKey];
      return filteredCourses;
    }, {});
  };

   const filteredCourseKeys = getCoursesByTerm(courses, selectedTerm);

   const filteredCourses = buildFilteredCourses(filteredCourseKeys, courses);

  return (
    <div>
      <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
      <CourseList courses={filteredCourses} />
    </div>
  );
};

export default TermPage;
