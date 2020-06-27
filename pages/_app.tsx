import { AuthContextWrapper } from '../context/auth-context'
import Header from '../components/Header'

export default ({ Component, pageProps }) => {
    return (
        <AuthContextWrapper>
            <Header />
            <Component {...pageProps} />
        </AuthContextWrapper>
    )
}