import { useState, useEffect } from 'react';
import ProfileCard from './components/ProfileCard';
import NotificationList from './components/NotificationList';
import Card from './components/Card';
import CourseCatalog from './components/CourseCatalog';

function StudentCard({ name, id, major }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>ID: {id}</p>
      <p>Major: {major}</p>
    </div>
  );
}

// Decide which task to show from the end of the address
function getView() {
  const hash = window.location.hash.replace('#', '');
  return hash === 'exercises' || hash === 'courses' ? hash : 'student';
}

function App() {
  const [view, setView] = useState(getView());

  useEffect(() => {
    const onChange = () => setView(getView());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return (
    <div>
      {view === 'student' && (
        <StudentCard name="Tamang Anish" id="202637595" major="Computer Engineering" />
      )}

      {view === 'exercises' && (
        <>
          <h2>Exercise 1: ProfileCard</h2>
          <ProfileCard name="Tamang Anish" role="Student" email="tamanganish296@gmail.com" />

          <h2>Exercise 2: Notifications</h2>
          <NotificationList />

          <h2>Exercise 3: Card with children</h2>
          <Card title="Lecture Topics">
            <ul>
              <li>Components</li>
              <li>Props</li>
            </ul>
          </Card>
          <Card title="Homework">
            <p>Build a student portfolio component</p>
          </Card>
        </>
      )}

      {view === 'courses' && (
        <>
          <h2>Course Catalog</h2>
          <CourseCatalog />
        </>
      )}
    </div>
  );
}

export default App;