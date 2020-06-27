import { useAuth } from '../hook/use-auth';
import Link from 'next/link';

export default function Header() {
    const { authContext }  = useAuth()

    return (
        <div className="header">
            <Link href="/">
                  <a>Logo</a>
                </Link>
            <div>
                {authContext.loggedIn ? (<Link href="/profile">
                  <a>Profile</a>
                </Link>) : "Login"}
            </div>

            <style jsx>{`
                .header {
                    display: flex;
                    justify-content: space-between;
                }
            `}</style>
        </div>
    )
}
