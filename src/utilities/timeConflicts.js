const parseMeetingTime = (meetingTime) => {
  const daysAndTime = /([A-Za-z]+) (\d{1,2}:\d{2})-(\d{1,2}:\d{2})/;
  const match = meetingTime.match(daysAndTime);

  if (!match) return null;

  const [_, days, startTime, endTime] = match;
  return { days, startTime, endTime };
};

const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const timesOverlap = (start1, end1, start2, end2) => {
  return timeToMinutes(start1) < timeToMinutes(end2) && timeToMinutes(start2) < timeToMinutes(end1);
};

// Check if two classes have a time conflict
export const hasTimeConflict = (course1, course2) => {
  if (!course1?.meets || !course2?.meets) return false;

  const meeting1 = parseMeetingTime(course1.meets);
  const meeting2 = parseMeetingTime(course2.meets);
  if (!meeting1 || !meeting2) return false;

  if (course1.term !== course2.term) return false;

  const commonDays = meeting1.days.split('').some(day => meeting2.days.includes(day));
  if (!commonDays) return false;

  return timesOverlap(meeting1.startTime, meeting1.endTime, meeting2.startTime, meeting2.endTime);
};

// Check if a course conflicts with any selected courses
export const isCourseConflicting = (newCourse, selectedCourses, courses) => {
  return selectedCourses.some(selectedCourseKey => {
    const selectedCourse = courses[selectedCourseKey];
    if (!selectedCourse || !newCourse) return false;
    return hasTimeConflict(selectedCourse, newCourse);
  });
};
