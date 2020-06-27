import { sign } from "jsonwebtoken"
import { serialize } from 'cookie';
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

export default function makeAuthCookie (user) {
    const claims = {
        id: user.id,
        email: user.email,
        username: user.username
    }

    const jwt = sign(claims, process.env.APP_SECRET)
    const authCookie = serialize('auth', jwt, {
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: serverRuntimeConfig.authCookieMaxAge,
        httpOnly: true,
        path: '/',
    })

    return {claims, authCookie}
}