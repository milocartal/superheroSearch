import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useParams, Link } from 'react-router-dom';

import '../App.css'

type JSONValue = { id: number, name: string, images:JSONImage}

interface JSONObject {
    [x: string]: JSONValue;
}

type JSONImage={xs:string; lg:string, sm:string, md:string;}

interface JSONArray extends Array<JSONValue> { }

function Hero() {
    let { id } = useParams()
    const [hero, setHero] = useState<JSONValue>()
    const baseUrl: string = 'https://akabab.github.io/superhero-api/api/';

    useEffect(() => {
        fetch(baseUrl + 'id/' + id + '.json')
            .then((res) => res.json())
            .then((res) => setHero(res))
    })

    return (
        <div className="Hero">
            {hero && (
                <>
                    <h1>{hero.name}</h1>
                    <img src={hero.images.lg} alt={hero.name}></img>
                    
                </>)}
        </div>
    )
}

export default Hero
