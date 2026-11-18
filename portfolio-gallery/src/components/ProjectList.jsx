import ProjectCard from './ProjectCard';

function ProjectList({ projects }) {
  if (projects.length === 0) return <p>No projects match this filter.</p>;

  return (
    <div className="project-list">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          tech={project.tech}
          github={project.github}
          demo={project.demo}
        />
      ))}
    </div>
  );
}

export default ProjectList;