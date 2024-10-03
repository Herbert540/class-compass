import React, { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';
import ScheduleModal from './ScheduleModal';

const TermPage = ({ courses }) => {
    const [selectedTerm, setSelectedTerm] = useState('Fall');
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Get the course keys for a given term
    const getCoursesByTerm = (courses, term) => {
        return Object.keys(courses).filter(courseKey => courses[courseKey].term === term);
    };

    // Build the final filtered courses
    const buildFilteredCourses = (courseKeys, courses) => {
        return courseKeys.reduce((filteredCourses, courseKey) => {
            filteredCourses[courseKey] = courses[courseKey];
            return filteredCourses;
        }, {});
    };

    const filteredCourseKeys = getCoursesByTerm(courses, selectedTerm);
    const filteredCourses = buildFilteredCourses(filteredCourseKeys, courses);

    // Toggle course selection
    const toggleCourseSelection = (courseKey) => {
        setSelectedCourses(prevSelected =>
            prevSelected.includes(courseKey)
                ? prevSelected.filter(key => key !== courseKey)
                : [...prevSelected, courseKey]
        );
    };

    // Open/close modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <TermSelector
                selectedTerm={selectedTerm}
                setSelectedTerm={setSelectedTerm}
                openModal={openModal}
            />
            <CourseList
                courses={filteredCourses}
                selectedCourses={selectedCourses}
                toggleCourseSelection={toggleCourseSelection}
            />
            <ScheduleModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                selectedCourses={selectedCourses}
                courses={courses}
            />
        </div>
    );
};

export default TermPage;
