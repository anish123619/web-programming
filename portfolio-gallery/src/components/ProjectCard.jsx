function ProjectCard({ title, description, tech, github, demo }) {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p className="description">{description}</p>
      <div className="tech-list">
        {tech.map(t => (
          <span className="tech-tag" key={t}>{t}</span>
        ))}
      </div>
      <div className="links">
        <a href={github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={demo} target="_blank" rel="noreferrer">Live Demo</a>
      </div>
    </div>
  );
}

export default ProjectCard;