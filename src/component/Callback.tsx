import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const Callback = () => {

    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState('');

    useEffect(() => {
        try {
            const fetchAccessToken = async () => {
                const newAccessToken = await getAccessTokenSilently();

                setToken(newAccessToken);
            };
            if (isAuthenticated) {
                fetchAccessToken();
            }
        } catch (e) {
            console.log("error", e);
        }
    }, [getAccessTokenSilently, isAuthenticated]);


    return (
        <div>
            <p>Callback</p>
            <p>usuario autenticado? {isAuthenticated ? 'verdadero' : 'falso'}</p>
            <p>nickname {user?.nickname}</p>
            <p>email {user?.email}</p>
            <p>profile {user?.profile}</p>
            <p>token{token}</p>

            token

        </div>
    )
}
