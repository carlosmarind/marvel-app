import { useEffect, useState } from "react"

export const Hello = () => {

    const [mensaje, setMensaje] = useState('')

    useEffect(() => {

        fetch('http://localhost:3001/secure/hello',
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`	
                }
            })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setMensaje(json.message)
            })
            .catch(error => console.log(error))

    }, [])

    return (
        <div>
            <h1>Hello {mensaje}</h1>
        </div>
    )

}