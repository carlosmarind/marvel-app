import { Comic } from "../interfaces/api-marvel";

interface ComicListProps {
    comics: Comic[];
}

export const ComicList = (props: ComicListProps) => {
    return (
        <>
            <h1>Lista de comics</h1>
            {props.comics.map((comic, index) => {
                return (
                    <div key={index}>
                        <h2>{comic.title}</h2>
                        <p>{comic.description}</p>
                        <img src={`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`} alt={comic.title} />
                    </div>
                )
            })}
        </>
    )
}