import { useState } from "react";
import { useDispatch } from "react-redux";
import { Md5 } from 'ts-md5';
import { login, logout } from "../redux/userSlice";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";


interface LoginResponse {
    message: string;
    metadata: {
        isAuthenticated: boolean;
        username: string;
        email: string;
        role: string[]
    }
}

export const Login = () => {

    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const passwordEncriptado = Md5.hashStr(form.password);

        fetch('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify({
                "username": form.username,
                "password": passwordEncriptado
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json() as Promise<LoginResponse>;
            }
            throw new Error('Error en la llamada http, no fue ok');
        }
        ).then(json => {
            console.log(json);
            dispatch(login({
                username: json.metadata.username,
                email: json.metadata.email,
                isAuth: json.metadata.isAuthenticated,
                role: json.metadata.role
            }))
            //que navegue a la ruta que se intento navegar pero estaba protegida
            navigate(-1);

        }).catch(error => {
            console.log(error);
            dispatch(logout());
        });
    }

    return (
        <div>
            {!user?.isAuth &&
                <div>
                    <h2>Formularion de ingreso</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p>Username</p>
                            <input type="text" name="username" value={form.username} onChange={handleChange} />
                        </label>
                        <label>
                            <p>Password</p>
                            <input type="password" name="password" value={form.password} onChange={handleChange} />
                        </label>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            }
            {user?.isAuth && <button type="button" onClick={() => dispatch(logout())}>logout</button>}
        </div>
    )
}