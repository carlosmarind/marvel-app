import { publicKey } from "../api"
import { useState } from "react";

export const SearchCharacter = () => {

    const [heroName, setHeroName] = useState('');

    const searchHero = async (nombreHeroe: string) => {
        fetch(`https://gateway.marvel.com//v1/public/characters?name=${nombreHeroe}&apikey=${publicKey}`, {
            method: 'GET',
        }).then(response => {

            if (response.ok) {
                return response.json() as Promise<CharacterDataWrapper>;
            } else {
                throw new Error('La solicitud no se pudo completar');
            }

        }).then(json => {
            console.log(json);
        }).catch(error => {
            console.log(error);
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        console.log(heroName);
        searchHero(heroName)
    }

    return (
        <>
            <h1>Buscador de heroes</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Busca un heroe" value={heroName} onChange={e => setHeroName(e.target.value)} />
                <button type="submit">Buscar</button>
            </form>
        </>
    );
}