import ProfileCard from './components/ProfileCard';
import NotificationList from './components/NotificationList';
import Card from './components/Card';

function StudentCard({ name, id, major }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>ID: {id}</p>
      <p>Major: {major}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <StudentCard name="Tamang Anish" id="202637595" major="Computer Engineering" />

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
    </div>
  );
}

export default App;