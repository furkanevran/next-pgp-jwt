import Head from 'next/head'
import React from 'react'
import { useAuth } from '../hook/use-auth'
import Link from 'next/link'

const LoginState = () => {
  const { authContext } = useAuth()

  return (
    <div>
      {authContext.loggedIn ? (<Link href="/logout">
      <a>logout page</a>
    </Link>)
    :
    (<Link href="/login">
    <a>login page</a>
  </Link>)}
      Login state: /{authContext.loggedIn+''}/
      
      {!authContext.loggedIn ?
        (<a onClick={() => authContext.login('test123@test.com', '123456')}>Login</a>)
        :
        (<a onClick={authContext.logout}>Logout</a>)
      }

      {authContext.loggedIn && (<h1>{authContext.user.id} - {authContext.user.username} </h1>)}
    </div>
  )
}
const Home = () => {
  return (
    <LoginState />
  )
}

export default Home
