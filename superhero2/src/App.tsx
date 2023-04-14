import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom';

import './App.css'

//Joke types
type JSONJoke={attachments:Array<Attach>, response_type:string, username:string}
type Attach={fallback:string, footer:string, text:string}

//Hero Type

type JSONHero = { id: number, name: string, slug:string, powerstats:JSONPowerStats, appearance:JSONAppearance, biographhy:JSONBiography, work:JSONWork,connections:JSONConnect, images:JSONImage}

type JSONPowerStats={inteligence:number, strength:number,speed:number, durability:number, power:number, combat:number}

type JSONAppearance={gender:string, race:string, height:string[], weight:string[], eyeColor:string, hairColor:string}

type JSONBiography={fullName:string, alterEgos:string, aliases:string[], placeOfBirth:string, firstAppearance:string, publicher:string,alignment:string}

type JSONWork={occupation:string, base:string}

type JSONConnect={groupAffiliation:string, relatives:string}

type JSONImage={xs:string; lg:string, sm:string, md:string;}

interface JSONHeroArray extends Array<JSONHero> { }

const base:JSONJoke={
  "attachments": [
      {
          "fallback": "Why is no one friends with Dracula? Because he's a pain in the neck.",
          "footer": "<https://icanhazdadjoke.com/j/cFd21gNClyd|permalink> - <https://icanhazdadjoke.com|icanhazdadjoke.com>",
          "text": "Why is no one friends with Dracula? Because he's a pain in the neck."
      }
  ],
  "response_type": "in_channel",
  "username": "icanhazdadjoke"
}

function App() {
  const [count, setCount] = useState(0)
  const [heros, setHeros] = useState<JSONHeroArray>([])
  const [jokes, setJoke] = useState<JSONJoke>(base)
  const baseUrl: string = 'https://akabab.github.io/superhero-api/api/';

  useEffect(() => {
    fetch(baseUrl + 'all.json')
      .then((res) => res.json())
      .then((res) => setHeros(res))
  })

  async function joke(){
    fetch('https://icanhazdadjoke.com/slack')
      .then((jo)=>jo.json())
      .then((jo)=>setJoke(jo))
  }

  return (
    <div className="App">
      <h1>SUPER Hero Wiki</h1>
      <div>
        <button onClick={joke}>JOKE DE PAPA</button>
        <p>{jokes.attachments[0].fallback}</p>
      </div>
     
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>

      <div>
        {heros.length > 0 && heros.map((hero) => {
          return (
            <Link to={`/hero/${hero.id}`} key={hero.id}>
              <div>
                {hero.name}
              </div>
            </Link>
          )
        })}
      </div>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

    </div>
  )
}

export default App
