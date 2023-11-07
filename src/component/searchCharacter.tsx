import { publicKey } from "../api"
import { useState } from "react";
import { ComicList } from "./ComicList";
import { CharacterDataWrapper, ComicDataWrapper } from "../interfaces/api-marvel";

export const SearchCharacter = () => {

    const [heroName, setHeroName] = useState('');
    const [hero, setHero] = useState<CharacterDataWrapper>({} as CharacterDataWrapper);
    const [comic, setComic] = useState<ComicDataWrapper>({} as ComicDataWrapper);

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
            setHero(json);
            console.log(json);
            if (json?.data?.results?.[0]?.id) {
                searchComicById(json?.data?.results?.[0]?.id)
            }

        }).catch(error => {
            console.log(error);
        })
    }

    const searchComicById = async (characterId: number) => {
        fetch(`https://gateway.marvel.com//v1/public/characters/${characterId}/comics?apikey=${publicKey}`, {
            method: 'GET',
        }).then(response => {

            if (response.ok) {
                return response.json() as Promise<ComicDataWrapper>;
            } else {
                throw new Error('La solicitud no se pudo completar');
            }

        }).then(json => {
            console.log("resumen de comics de heroes");
            console.log(json);
            setComic(json);
        }).catch(error => {
            console.log(error);
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchHero(heroName)
    }

    return (
        <>
            <h1>Buscador de heroes</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Busca un heroe" value={heroName} onChange={e => setHeroName(e.target.value)} />
                <button type="submit">Buscar</button>
            </form>

            {hero?.data?.results?.length !== undefined && hero?.data?.results?.length > 0 && <img alt="imagen heroe" src={hero?.data?.results?.[0].thumbnail?.path + "." + hero?.data?.results?.[0].thumbnail?.extension} />}

            <p>{hero?.data?.results?.[0].description}</p>

            {comic?.data?.results?.length !== undefined && comic?.data?.results?.length > 0 && <ComicList comics={comic?.data?.results} />}
        </>
    );
}