import { WithAuth } from '../hoc/withAuth';
import { AuthContextType } from '../context/auth-context';

interface LogoutPropTypes {
    authContext: AuthContextType;
}

export default WithAuth(({authContext}: LogoutPropTypes) => {

    return (
        <div>
            <button onClick={authContext.logout}>Logout</button>
        </div>
    )
}, '/')