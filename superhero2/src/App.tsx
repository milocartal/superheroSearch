import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom';

import './App.css'

//Joke types
type JSONJoke={attachments:Array<Attach>, response_type:string, username:string}
type Attach={fallback:string, footer:string, text:string}

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

//Hero Type

type JSONHero = { id: number, name: string, slug:string, powerstats:JSONPowerStats, appearance:JSONAppearance, biography:JSONBiography, work:JSONWork,connections:JSONConnect, images:JSONImage}

type JSONPowerStats={inteligence:number, strength:number,speed:number, durability:number, power:number, combat:number}

type JSONAppearance={gender:string, race:string, height:string[], weight:string[], eyeColor:string, hairColor:string}

type JSONBiography={fullName:string, alterEgos:string, aliases:string[], placeOfBirth:string, firstAppearance:string, publisher:string,alignment:string}

type JSONWork={occupation:string, base:string}

type JSONConnect={groupAffiliation:string, relatives:string}

type JSONImage={xs:string; lg:string, sm:string, md:string;}

interface JSONHeroArray extends Array<JSONHero> { }

const linkStyle={
  color:'white',
}

function App() {

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

      <div className='listHero'>
        {heros.length > 0 && heros.map((hero) => {
          return (
            <Link to={`/hero/${hero.id}`} key={hero.id}>
              <div className='card'>
                <p>{hero.name}</p>
                <img src={hero.images.sm} alt={hero.name} />
                <p>{hero.biography.publisher}</p>
              </div>
            </Link>
          )
        })}
      </div>

      <div>
        <button onClick={joke}>JOKE DE PAPA</button>
        <p>{jokes.attachments[0].fallback}</p>
      </div>

    </div>
  )
}

export default App
