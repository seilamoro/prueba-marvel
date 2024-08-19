import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    document.title = "Prueba Marvel"
  }, [])

  return (
    <div data-testid='appDiv'></div>
  );
}

export default App;
