import { useAuth } from "../hook/use-auth"

/**
 * Page auth protection HOC only usable for DRY redirecting
 * @param Component Child component
 * @param url Redirect url
 * @param redirectIfFound Redirect if user is found
 */
export function WithAuth (Component, url?:string, redirectIfFound:boolean = false) {
    const authWrapper = (props) => {
        const { authContext, loading } = useAuth(url, redirectIfFound)

        if(loading) return (<>Loading...</>)
        if(!loading && ((authContext.loggedIn && redirectIfFound) || (!authContext.loggedIn && !redirectIfFound))) return (<>Redirecting</>)

        return (
            <Component {...props} authContext={authContext}/>
        )
    }

    return authWrapper
}