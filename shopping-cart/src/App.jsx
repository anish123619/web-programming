import { useState, useEffect } from 'react';
import ShoppingCart from './ShoppingCart';
import PracticeCart from './practice/ShoppingCart';
import ToggleDetail from './guide/ToggleDetail';
import TaskList from './guide/TaskList';
import ScoreBoard from './guide/ScoreBoard';

function getView() {
  const hash = window.location.hash;
  if (hash === '#counter') return 'counter';
  if (hash === '#guide') return 'guide';
  return 'shop';
}

function App() {
  const [view, setView] = useState(getView());

  useEffect(() => {
    const onChange = () => setView(getView());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  if (view === 'counter') return <PracticeCart />;

  if (view === 'guide') {
    return (
      <main className="guide">
        <h1>Study Guide Exercises</h1>

        <section>
          <h2>Exercise 1: Toggle details</h2>
          <ToggleDetail />
        </section>

        <section>
          <h2>Exercise 2: Task list</h2>
          <TaskList />
        </section>

        <section>
          <h2>Exercise 3: Score board</h2>
          <ScoreBoard />
        </section>
      </main>
    );
  }

  return <ShoppingCart />;
}

export default App;