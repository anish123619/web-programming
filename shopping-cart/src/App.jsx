import { useState, useEffect } from 'react';
import ShoppingCart from './ShoppingCart';
import PracticeCart from './practice/ShoppingCart';

function getView() {
  return window.location.hash === '#counter' ? 'counter' : 'shop';
}

function App() {
  const [view, setView] = useState(getView());

  useEffect(() => {
    const onChange = () => setView(getView());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return view === 'counter' ? <PracticeCart /> : <ShoppingCart />;
}

export default App;