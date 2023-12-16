/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bodega, Persona } from "../interfaces/api-marvel"

export const Home = () => {

    const individuo: Persona = {
        nombre: 'Juan',
        edad: 30,
        direccion: {
            calle: 'Calle 1',
            numeroCalle: 123,
            ciudad: 'CABA'
        }
    }

    const bodegaPrincipal: Bodega = {
        codigo: "ASASDF12",
        nombre: 'Bodega 1',
        encargado: individuo,
        direccion: {
            calle: 'Calle 1',
            numeroCalle: 123,
            ciudad: 'CABA'
        },
    }

    console.log(individuo);
    console.log(bodegaPrincipal);

    return (
        <div>
            <h2>Home</h2>
        </div>
    )
}