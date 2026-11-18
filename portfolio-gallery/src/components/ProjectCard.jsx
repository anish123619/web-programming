function ProjectCard({ title, description, tech, github, demo }) {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <p><strong>Tech:</strong> {tech.join(', ')}</p>
      <a href={github} target="_blank" rel="noreferrer">GitHub</a>
      {' | '}
      <a href={demo} target="_blank" rel="noreferrer">Live Demo</a>
    </div>
  );
}

export default ProjectCard;