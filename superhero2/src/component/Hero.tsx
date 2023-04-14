import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useParams, Link } from 'react-router-dom';

import '../App.css'

//Hero Type

type JSONHero = { id: number, name: string, slug:string, powerstats:JSONPowerStats, appearance:JSONAppearance, biography:JSONBiography, work:JSONWork,connections:JSONConnect, images:JSONImage}

type JSONPowerStats={inteligence:number, strength:number,speed:number, durability:number, power:number, combat:number}

type JSONAppearance={gender:string, race:string, height:string[], weight:string[], eyeColor:string, hairColor:string}

type JSONBiography={fullName:string, alterEgos:string, aliases:string[], placeOfBirth:string, firstAppearance:string, publisher:string,alignment:string}

type JSONWork={occupation:string, base:string}

type JSONConnect={groupAffiliation:string, relatives:string}

type JSONImage={xs:string; lg:string, sm:string, md:string;}

interface JSONHeroArray extends Array<JSONHero> { }

function Hero() {
    let { id } = useParams()
    const [hero, setHero] = useState<JSONHero>()
    const baseUrl: string = 'https://akabab.github.io/superhero-api/api/';

    useEffect(() => {
        fetch(baseUrl + 'id/' + id + '.json')
            .then((res) => res.json())
            .then((res) => setHero(res))
    })

    return (
        <div className="Hero">
            <button>Return Main</button>
            {hero && (
                <div>
                    <h1>{hero.name}</h1>
                    <img src={hero.images.lg} alt={hero.name}></img>
                    
                </div>)}
        </div>
    )
}

export default Hero
