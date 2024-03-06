import { useState } from 'react';
import '../styles/App.css';
import { LoginButton } from './LoginButton';
import REPL from './REPL';
import React from 'react';

/**
 * This is the highest level component! This is responsible for creating the initial login button,
 * setting the log in state, and creating the repl object. 
 */
function App() {
  /**
   * Constant to represent log in state and set the initial value to false. 
   */
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </p>

      { isLoggedIn && <REPL /> } 
    </div>
  );
}

export default App;