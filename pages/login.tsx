import { WithAuth } from '../hoc/withAuth';
import { sspAuth } from '../utils/sspAuth';
import User from '../db/models/user';
import { AuthContextType } from '../context/auth-context';

interface LoginPropTypes {
    authContext: AuthContextType;
    user: User;
}

export default WithAuth(({authContext, user}: LoginPropTypes) => {
    return (
        <div>
            <button onClick={() => authContext.login('', '')}>Login</button>
        </div>
    )
}, '/', true)

export const getServerSideProps = sspAuth((ctx, user) => {
    return {
        props: {
            a: ctx.req.headers.cookie ?? null,
            user
        }
    }
})