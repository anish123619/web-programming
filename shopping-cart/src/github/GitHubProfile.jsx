import { useState, useEffect } from 'react';

function GitHubProfile() {
  const [username, setUsername] = useState('');   // what the user types
  const [debounced, setDebounced] = useState(''); // the name we actually search
  const [user, setUser] = useState(null);         // the result
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Bonus: wait 500ms after the last keystroke before searching
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(username.trim()), 500);
    return () => clearTimeout(timer); // cancel if the user types again
  }, [username]);

  // Fetch whenever the (debounced) username changes
  useEffect(() => {
    if (!debounced) {
      setUser(null);
      setError('');
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError('');
    setUser(null);

    fetch(`https://api.github.com/users/${encodeURIComponent(debounced)}`, {
      signal: controller.signal,
    })
      .then(res => {
        if (res.status === 404) throw new Error('User not found');
        if (res.status === 403) throw new Error('GitHub rate limit reached. Try again later.');
        if (!res.ok) throw new Error('Something went wrong (' + res.status + ')');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return; // an old request was cancelled
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort(); // cancel the old request
  }, [debounced]);

  return (
    <div className="gh">
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="GitHub username"
      />

      {loading && <p className="gh-status">Loading...</p>}
      {error && <p className="gh-error">{error}</p>}

      {user && (
        <div className="gh-card">
          <img src={user.avatar_url} alt={user.login} />
          <h3>{user.name || user.login}</h3>
          <p>Public repos: {user.public_repos}</p>
          <p>{user.bio || 'No bio'}</p>
        </div>
      )}
    </div>
  );
}

export default GitHubProfile;