import { useEffect, useState } from "react";
import { Heroe } from "../interfaces/api-jsonserver";
import { CreateHero } from "./CreateHero";

export const HeroesPreferidos = () => {

    const [listaHeroes, setListaHeroes] = useState<Heroe[]>([]);
    const [edit, setEdit] = useState<boolean>(false);
    const [editableHero, setEditableHero] = useState<Heroe | undefined>(undefined);

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

    const deleteheroe = (id: number) => {
        fetch(`http://localhost:3000/heroes/${id}`, {
            method: 'DELETE',
        }).then(response => {

            if (response.ok) {
                const newListaHeroes = listaHeroes.filter(heroe => heroe.id !== id);
                setListaHeroes(newListaHeroes);
            } else {
                throw new Error('algo salio mal al eliminar el heroe');
            }

        }).catch(error => {
            console.error(error);
        });
    }

    const addHeroeToState = (heroe: Heroe) => {
        fetch(`http://localhost:3000/heroes`, {
            method: 'POST',
            body: JSON.stringify(heroe),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json() as Promise<Heroe>;
            } else {
                throw new Error('algo salio mal al crear el heroe en el backend');
            }
        }).then(json => {
            console.log(json);
            setListaHeroes([...listaHeroes, json]);
        }).catch(error => {
            console.error(error);
        });
    }

    const patchHero = (hero: Heroe) => {
        fetch(`http://localhost:3000/heroes/${hero.id}`, {
            method: 'PATCH',
            body: JSON.stringify(hero),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json() as Promise<Heroe>;
            } else {
                throw new Error('algo salio mal al crear el heroe en el backend');
            }
        }).then(json => {
            console.log(json);
            const newListaHeroes = listaHeroes.map(heroe => {
                if (heroe.id === json.id) {
                    return json;
                } else {
                    return heroe;
                }
            });
            setListaHeroes(newListaHeroes);
        }).catch(error => {
            console.error(error);
        }).finally(() => {
            setEditableHero(undefined);
            setEdit(false);
        });
    }

    const handleEdit = (heroe: Heroe) => {
        setEditableHero(heroe)
        setEdit(true);
    }

    return (
        <>
            <CreateHero edit={edit} editableHero={editableHero} addHeroeToState={addHeroeToState} patchHero={patchHero} />
            <h2>Heroes preferidos</h2>
            <p>Lista de heroes preferidos</p>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nombre</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaHeroes.map((heroe) => {
                            return (
                                <tr key={heroe.id}>
                                    <td>{heroe.id}</td>
                                    <td>{heroe.name}</td>
                                    <td>
                                        <button onClick={() => handleEdit(heroe)}>editar</button>
                                        <button onClick={() => deleteheroe(heroe.id!)}>borrar</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </>
    )
}