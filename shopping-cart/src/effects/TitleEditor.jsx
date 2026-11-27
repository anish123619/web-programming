import { useState, useEffect } from 'react';

function TitleEditor() {
  const [text, setText] = useState('');

  useEffect(() => {
    document.title = text || 'WebPro';
    return () => { document.title = 'WebPro'; }; // cleanup on unmount
  }, [text]);

  return (
    <input
      value={text}
      onChange={e => setText(e.target.value)}
      placeholder="Type to change tab title…"
    />
  );
}

export default TitleEditor;