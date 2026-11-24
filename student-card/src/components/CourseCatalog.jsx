import CourseCard from './CourseCard';

const courses = [
  { id: 1, title: 'Web Programming', instructor: 'Dr. Toshpulatov', credits: 3, required: true },
  { id: 2, title: 'Database Systems', instructor: 'Dr. Kim', credits: 3, required: true },
  { id: 3, title: 'Machine learning Programming', instructor: 'Dr. Lee', credits: 3, required: false },
  { id: 4, title: 'World Issue', instructor: 'Mr.abc', credits: 2, required: true },
  { id: 5, title: 'Career development English', instructor: 'Mr.xyz', credits: 2, required: false },
];
function CourseCatalog() {
  return (
    <div className="course-catalog">
      {courses.map(course => (
        <CourseCard
          key={course.id}
          title={course.title}
          instructor={course.instructor}
          credits={course.credits}
          required={course.required}
        />
      ))}
    </div>
  );
}

export default CourseCatalog;