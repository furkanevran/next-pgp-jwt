import {WithAuth} from '../hoc/withAuth';
import { AuthContextType } from '../context/auth-context';
import Link from 'next/link';

interface ProfilePropType {
    authContext: AuthContextType
}

export default WithAuth(({authContext} : ProfilePropType) => {
    return (
    <>
    <div>Username: {authContext.user.username}</div>
    <Link href="/">
      <a onClick={authContext.logout}>Logout</a>
    </Link>
    </>
    )
}, '/')