import { useState } from 'react';
import FilterBar from './components/FilterBar';
import ProjectList from './components/ProjectList';
import './App.css';

const projects = [
  { id: 1, title: 'Gaze', description: 'An online chatting platform.',
    tech: ['HTML', 'CSS', 'Javascript'], github: 'https://github.com/anish123619/web-programming/tree/main/team-project', demo: 'https://anish123619.github.io/web-programming/team-project/team-project.html' },
  { id: 2, title: 'Book finder', description: 'A platform for every book lover.',
    tech: ['HTML','CSS','Javascript'], github: 'https://github.com/anish123619/webpro-book-search', demo: 'https://anish123619.github.io/webpro-book-search/' },
  { id: 3, title: 'Joke house', description: 'A place to come and laugh alone.',
    tech: ['HTML','CSS'], github: 'https://github.com/anish123619/web-programming/blob/main/week06/joke-generator.html', demo: 'https://anish123619.github.io/web-programming/week06/joke-generator.html' },
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
        options={['All', 'HTML', 'CSS','Javascript']}
        selected={selected}
        onSelect={setSelected}
      />
      <ProjectList projects={filtered} />
    </div>
  );
}

export default App;