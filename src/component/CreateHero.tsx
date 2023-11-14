import { useEffect, useState } from "react";
import { Heroe } from "../interfaces/api-jsonserver";

interface Props {
    edit: boolean
    editableHero: Heroe | undefined;
    addHeroeToState: (heroe: Heroe) => void;
    patchHero: (hero: Heroe) => void;
}

export const CreateHero = (props: Props) => {

    const estadoInicial: Heroe = {
        name: ''
    }

    const [formulario, setFormulario] = useState<Heroe>(estadoInicial);

    useEffect(() => {
        if (props.edit && props.editableHero) {
            setFormulario({ name: props.editableHero.name })
        }
    }, [props]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormulario({ ...formulario, [name]: value });
    }

    const handleCreate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (formulario.name === '') {
            alert('el nombre no puede estar vacio');
            return;
        }
        props.addHeroeToState(formulario);
        setFormulario(estadoInicial);
    }

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (formulario.name === '') {
            alert('el nombre no puede estar vacio');
            return;
        }
        if (props.edit && props.editableHero) {
            const heroeEditado = {
                ...props.editableHero,
                name: formulario.name
            }
            props.patchHero(heroeEditado);
            setFormulario(estadoInicial);
        }
    }
    return (
        <>
            <h2>Formulario de creacion de heroes</h2>
            <form >
                <div>
                    <label>Nombre Heroe :</label>
                    <input type="text" placeholder="nombre heroe" name="name" onChange={handleChange} value={formulario.name}></input>
                </div>
                <div>
                    {!props.edit && <button onClick={handleCreate} type="button">Crear Heroe</button>}
                    {props.edit && <button onClick={handleEdit} type="button">Confirmar Edicion</button>}
                </div>
            </form >
        </>
    )
}