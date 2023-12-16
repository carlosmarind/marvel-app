import { publicKey } from "../api"
import { ChangeEvent, useState } from "react";
import { ComicList } from "./ComicList";
import { CharacterDataWrapper } from "../interfaces/api-marvel";
interface Hero {
    id?: number;
    nombre: string;
    descripcion: string;
    imagen: string;
}

export const SearchCharacter = () => {

    const [formHeroName, setFormHeroName] = useState('');
    const [hero, setHero] = useState<Hero>({} as Hero);

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

            if (json?.data?.results?.[0]?.id) {

                const receivedHero: Hero = {
                    id: json.data.results[0].id,
                    nombre: json.data.results[0].name ?? '',
                    descripcion: json.data.results[0].description ?? '',
                    imagen: json.data.results[0].thumbnail?.path + "." + json.data.results[0].thumbnail?.extension,
                }
                setHero(receivedHero);
            }
        }).catch(error => {
            console.log(error);
        })
    }



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchHero(formHeroName);
    }

    function handleChangeHero(event: ChangeEvent<HTMLInputElement>): void {
        console.log(event.target.checked);
    }

    return (
        <>
            <h1>Buscador de heroes</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Busca un heroe" value={formHeroName} onChange={e => setFormHeroName(e.target.value)} />
                <button type="submit">Buscar</button>
            </form>
            {
                (hero.id) &&
                <>
                    <div style={{ marginLeft: '50px' }}>
                        <h2>Descripcion del heroe</h2>
                        <div style={{ display: 'flex', marginLeft: '50px', gap: '10px' }}>
                            <img style={{ maxWidth: '350px', maxHeight: '350px' }} alt="imagen heroe" src={hero.imagen} />
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                                <div>
                                    <span>nombre: {hero.nombre}</span>
                                    <input type="checkbox" className="star" title="heroe favorito" name={hero.nombre} onChange={handleChangeHero} />
                                </div>
                                <p>{hero.descripcion}</p>
                            </div>
                        </div>
                    </div >
                    <ComicList heroId={hero.id} />
                </>
            }
        </>
    );
}