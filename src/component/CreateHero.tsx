import { useState } from "react";
import { Heroe } from "../interfaces/api-jsonserver";

interface Props {
    addHeroeToState: (heroe: Heroe) => void;
}

export const CreateHero = (props: Props) => {

    interface Formulario {
        name: string;
    }

    const estadoInicial: Formulario = {
        name: ''
    }
    const [formulario, setFormulario] = useState<Formulario>(estadoInicial);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormulario({ ...formulario, [name]: value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formulario.name === '') {
            alert('el nombre no puede estar vacio');
            return;
        }

        createHeroe(formulario);
        setFormulario(estadoInicial);
    }

    const createHeroe = (heroe: Formulario) => {

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
            props.addHeroeToState(json);
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <>
            <h2>Formulario de creacion de heroes</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre Heroe :</label>
                    <input type="text" placeholder="nombre heroe" name="name" onChange={handleChange} value={formulario.name}></input>
                </div>
                <div>
                    <button type="submit">Crear Heroe</button>
                </div>
            </form >
        </>
    )
}