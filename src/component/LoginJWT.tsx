import { useState } from "react";
import { useDispatch } from "react-redux";
import { Md5 } from 'ts-md5';
import { login, logout } from "../redux/userSlice";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
    status: number;
    success: boolean;
    message: string;
    token: string;
}

interface TokenClaims {
    username: string;
    email: string;
    role: string[],
    iat: number;
    exp: number;
}

export const LoginJWT = () => {

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

        fetch('http://localhost:3001/auth/login', {
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
        }).then(json => {

            localStorage.setItem('token', json.token);
            const decodedToken = jwtDecode<TokenClaims>(json.token);

            dispatch(login({
                username: decodedToken.username,
                email: decodedToken.email,
                isAuth: true,
                role: decodedToken.role,
            }))
            //que navegue a la ruta que se intento navegar pero estaba protegida
            navigate(-1);

        }).catch(error => {
            console.log(error);
            dispatch(logout());
            localStorage.removeItem('token');
        });
    }
    return (
        <div>
            {!user?.isAuth &&
                <div>
                    <div>
                        <h2>Autenticar con backend (jwt)</h2>
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
                </div>
            }
            {user?.isAuth && <button type="button" onClick={() => dispatch(logout())}>logout</button>}
        </div>
    )
}