import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';

function App() {
  const cont = document.getElementById('res');
  const root = ReactDOMClient.createRoot(cont as HTMLElement);

  function handleChange(e: { target: { value: string }; }) {

  };

  async function handleClick() {
    fetch('https://akabab.github.io/superhero-api/api/' + 'all.json')
      .then((res) => res.json())
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          const element = (
          <div>
            {res[i].name}
            <img src={res[i].images[0]} alt={res[i].name}></img>
          </div>);
          console.log(res[i].images)
          root.render(element);
        }
        

      });

  };

  return (
    <div className="App">
      <h1>Super Hero Search</h1>
      <input type="text" name="shn" id="shn" onChange={handleChange} />
      <button onClick={handleClick}>Test</button>

    </div>
  );
}

export default App;
