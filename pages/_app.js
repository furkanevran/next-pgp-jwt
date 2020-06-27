import { AuthContextWrapper } from '../context/auth-context'

export default ({ Component, pageProps }) => {
    return (
        <AuthContextWrapper>
            <Component {...pageProps} />
        </AuthContextWrapper>
    )
}