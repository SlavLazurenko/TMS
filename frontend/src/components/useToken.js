import { useState } from 'react';
import Cookies from 'universal-cookie';
export default function useToken() {

    const cookies = new Cookies()

    const getToken = () => {

        const tokenString = cookies.get('access_token')
        return tokenString
    }

    const [token, setToken] = useState(getToken())

    const saveTokenToState = tokenString => {
        setToken(tokenString)
    }

    return {
        setToken: saveTokenToState,
        token
    }
}