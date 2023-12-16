import { useEffect, useState } from "react";
import { ComicDataWrapper } from "../interfaces/api-marvel";
import { publicKey } from "../api"


interface ComicListProps {
    heroId: number
}
interface HeroComic {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
}

export const ComicList = (props: ComicListProps) => {

    const [comics, setComics] = useState<HeroComic[]>([]);

    useEffect(() => {

        fetch(`https://gateway.marvel.com//v1/public/characters/${props.heroId}/comics?apikey=${publicKey}`, {
            method: 'GET',
        }).then(response => {

            if (response.ok) {
                return response.json() as Promise<ComicDataWrapper>;
            } else {
                throw new Error('La solicitud no se pudo completar');
            }

        }).then(json => {
            console.log(json);

            if (json?.data?.results) {

                const newComics: HeroComic[] = json.data.results
                    .filter(comic => comic.id !== undefined)
                    .map(comic => {
                        return {
                            id: comic.id!,
                            nombre: comic.title ?? '',
                            descripcion: comic.description ?? '',
                            imagen: comic.thumbnail?.path + "." + comic.thumbnail?.extension,
                        }
                        console.log

                    });

                setComics(newComics)
            }


        }).catch(error => {
            console.log(error);
        });

    }, [props.heroId]);

    return (
        <div style={{ display: 'flex', gap: '50px', flexDirection: 'column', marginLeft: '50px' }}>
            <h2>Comics del heroe</h2>
            {comics.map((comic, index) => {
                return (
                    <div key={index} style={{ display: 'flex', gap: '50px' }}>
                        <img src={comic.imagen} alt={comic.nombre} style={{ maxWidth: '250px', maxHeight: "250px" }} />
                        <div>
                            <h3>{comic.nombre} <input className="star" type="checkbox" title="comic favorito" /></h3>
                            <p>{comic.descripcion}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}