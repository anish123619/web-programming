import { useState, useEffect } from 'react';
import ShoppingCart from './ShoppingCart';
import PracticeCart from './practice/ShoppingCart';
import ToggleDetail from './guide/ToggleDetail';
import TaskList from './guide/TaskList';
import ScoreBoard from './guide/ScoreBoard';
import GitHubProfile from './github/GitHubProfile';
import TitleEditor from './effects/TitleEditor';
import UserProfile from './effects/UserProfile';
import Stopwatch from './effects/Stopwatch';
import WeatherDashboard from './weather/WeatherDashboard';
import ProfileEditor from './forms/ProfileEditor';

// Every address (the part after #) that has its own page
const VIEWS = ['counter', 'guide', 'github', 'effects', 'weather', 'profile'];

function getView() {
  const name = window.location.hash.replace('#', '');
  return VIEWS.includes(name) ? name : 'shop';
}

function Page({ title, children }) {
  return (
    <main className="guide">
      <h1>{title}</h1>
      {children}
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

function App() {
  const [view, setView] = useState(getView());

  useEffect(() => {
    const onChange = () => setView(getView());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  switch (view) {
    case 'counter':
      return <PracticeCart />;

    case 'weather':
      return (
        <Page title="Weather Dashboard">
          <Section><WeatherDashboard /></Section>
        </Page>
      );

    case 'github':
      return (
        <Page title="GitHub User Lookup">
          <Section><GitHubProfile /></Section>
        </Page>
      );

    case 'effects':
      return (
        <Page title="useEffect Exercises">
          <Section title="Exercise 1: Title editor"><TitleEditor /></Section>
          <Section title="Exercise 2: Fetch a user"><UserProfile /></Section>
          <Section title="Exercise 3: Stopwatch"><Stopwatch /></Section>
        </Page>
      );

    case 'guide':
      return (
        <Page title="Study Guide Exercises">
          <Section title="Exercise 1: Toggle details"><ToggleDetail /></Section>
          <Section title="Exercise 2: Task list"><TaskList /></Section>
          <Section title="Exercise 3: Score board"><ScoreBoard /></Section>
        </Page>
      );

    case 'profile':
      return (
        <Page title="Student Profile Editor">
          <Section><ProfileEditor /></Section>
        </Page>
      );

    default:
      return <ShoppingCart />;
  }
}

export default App;