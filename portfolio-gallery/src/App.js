import { useState } from 'react';
import FilterBar from './components/FilterBar';
import ProjectList from './components/ProjectList';
import './App.css';

const projects = [
  { id: 1, title: 'Gaze', description: 'An online chatting Platform.',
    tech: ['HTML', 'CSS', 'Javascript'], github: 'https://github.com/anish123619/web-programming/tree/main/team-project', demo: 'https://anish123619.github.io/web-programming/team-project/team-project.html' },
  { id: 2, title: 'Book finder.', description: 'platform for every book lover.',
    tech: ['HTML','CSS','Javascript'], github: 'https://github.com/anish123619/webpro-book-search', demo: 'https://anish123619.github.io/webpro-book-search/' },
  { id: 3, title: 'joke house', description: 'A place to come and laugh alone.',
    tech: ['HTML','CSS','Java script'], github: 'https://github.com/you/landing', demo: 'https://anish123619.github.io/webpro-book-search/' },
];

function App() {
  const [selected, setSelected] = useState('All');

  const filtered = selected === 'All'
    ? projects
    : projects.filter(p => p.tech.includes(selected));

  return (
    <div>
      <h1>My Portfolio</h1>
      <FilterBar
        options={['All', 'HTML','React', 'Node', 'CSS','Javascript']}
        selected={selected}
        onSelect={setSelected}
      />
      <ProjectList projects={filtered} />
    </div>
  );
}

export default App;