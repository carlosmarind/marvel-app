import { Comic } from "../interfaces/api-marvel";

interface ComicListProps {
    comics: Comic[];
}

export const ComicList = (props: ComicListProps) => {
    return (
        <div style={{ display: 'flex', gap: '50px', flexDirection: 'column', marginLeft: '50px' }}>
            <h2>Comics del heroe</h2>
            {props.comics.map((comic, index) => {
                return (
                    <div key={index} style={{ display: 'flex', gap: '50px' }}>
                        <img src={`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension
                            }`} alt={comic.title} style={{ maxWidth: '250px', maxHeight: "250px" }} />
                        <div>
                            <h3>{comic.title} <input className="star" type="checkbox" title="comic favorito" /></h3>
                            <p>{comic.description}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}