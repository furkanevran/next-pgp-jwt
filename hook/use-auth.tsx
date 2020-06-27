import { useContext, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { AuthContext, AuthContextType } from '../context/auth-context';

/**
 * Returns Auth Context and loading state
 * @param url Redirect url
 * @param redirectIfFound Redirect if user is found
 */
export const useAuth = (url?: string, redirectIfFound:boolean =  false) => {
    const [loading, setLoading] = useState(true)

    const authContext : AuthContextType = useContext(AuthContext)
    const router = useRouter()
    
    useEffect(() => {
        const hasUser = loading ? !!window.localStorage.getItem('user') : authContext.loggedIn
        
        if (url &&
            ((hasUser && redirectIfFound)
                      ||
            (!hasUser && !redirectIfFound))) {
            router.push(url)
        }
    }, [authContext.loggedIn, url, redirectIfFound])

    useEffect(() => setLoading(false), [])

    return {authContext, loading}
}