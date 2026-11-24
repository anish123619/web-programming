import { useState } from 'react';

function ToggleDetail() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(prev => !prev)}>
        {isVisible ? 'Hide details' : 'Show details'}
      </button>
      {isVisible && (
        <p>React state enables dynamic UIs without page reloads.</p>
      )}
    </div>
  );
}

export default ToggleDetail;