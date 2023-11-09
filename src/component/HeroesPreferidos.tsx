import { useEffect, useState } from "react";
import { Heroe } from "../interfaces/api-jsonserver";

export const HeroesPreferidos = () => {

    const [listaHeroes, setListaHeroes] = useState<Heroe[]>([]);

    useEffect(() => {
        fetch(`http://localhost:3000/heroes`, {
            method: 'GET',
        }).then(response => {
            return response.json() as Promise<Heroe[]>;
        }).then(json => {
            console.log(json);
            setListaHeroes(json);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <>
            <h2>Heroes preferidos</h2>
            <p>Lista de heroes preferidos</p>
            <ul>{listaHeroes.map((heroe) => {
                return (
                    <li key={heroe.id}> {heroe.name}</li>
                )
            })}
            </ul>
        </>
    )
}