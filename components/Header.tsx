import { useAuth } from '../hook/use-auth';

export default function Header() {
    const { authContext }  = useAuth()

    return (
        <div className="header">
            <div>Logo</div>
            <div>
                {authContext.loggedIn ? "Profile" : "Login"}
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
