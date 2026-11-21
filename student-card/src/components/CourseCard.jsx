function CourseCard({ title, instructor, credits, required }) {
  return (
    <div className="course-card">
      <div className="course-top">
        <h3>{title}</h3>
        {required ? (
          <span className="badge badge-required">필수</span>
        ) : (
          <span className="badge badge-optional">선택</span>
        )}
      </div>
      <p>Instructor: {instructor}</p>
      <p>Credits: {credits}</p>
    </div>
  );
}

export default CourseCard;