import { createContext, useState, useEffect } from 'react'
import User from '../db/models/user';
import axios from 'axios'
import useSWR from 'swr'

export interface AuthContextType {
    loggedIn: boolean,
    user: User | null,
    login: (username: string, password: string) => Promise<User | Error>,
    logout: () => void
}

export const AuthContext = createContext({} as AuthContextType)

const login = async (username: string, password: string) : Promise<User | Error> => {
    try {
        const request = await axios.post('/api/auth/login',{
        email: username,
        pw: password 
        })

        if(request.status === 200) {
            const data = await request.data
            window.localStorage.setItem('user', JSON.stringify(data))
            return data
        }
    } catch (err) {
        return err
    }
}

const logout = () => {
    axios.get('/api/auth/logout').then(data => {
        if(data.status === 200) {
            window.localStorage.removeItem('user')
        }
    })
}

export const AuthContextWrapper = ({children}) => {
    const [user, setUser] = useState(null)

    useSWR('/api/auth/me', (url) => axios.get(url).then((d) => d.data), {
        refreshInterval: 10000,

        onError: () => {
            window.localStorage.removeItem('user')
            setUser(null)
        },

        onSuccess: (data) => {
            window.localStorage.setItem('user', JSON.stringify(data))
            setUser(data)
        }
    })

    const hookedLogin = async (username: string, password: string) : Promise<User | Error> => {
        const user = await login(username, password)

        if('username' in user) {
            setUser(user)
        }

        return user as Error
    }

    const hookedLogout = () => {
        logout()
        setUser(null)
    }

    const refreshUser = () => {
        if(typeof window !== "undefined") {
            const user = window.localStorage.getItem('user')
            setUser(user !== '' ? JSON.parse(user) : null)
        }
    }

    useEffect(() => {
        refreshUser()

        const syncAuth = async (event) => {
            if (event.key === 'user') {
                refreshUser()
            }
        }

        window.addEventListener('storage', syncAuth)
        return () => {
          window.removeEventListener('storage', syncAuth)
        }
    }, [])

    return (
        <AuthContext.Provider value={{loggedIn: !!user, user, login: hookedLogin, logout: hookedLogout}}>
            {children}
        </AuthContext.Provider>
    )
}