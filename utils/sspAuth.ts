import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ParsedUrlQuery } from 'querystring';
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
import User from '../db/models/user';

/**
 * Returns additional user parameter for getServerSideProps
 * @param getServerSidePropsFunc getServerSideProps function with (context, user) parameters
 */
export function sspAuth (getServerSidePropsFunc: (context: GetServerSidePropsContext<ParsedUrlQuery>, user: User) => GetServerSidePropsResult<{ [key: string]: any; }>){
    return async (context: any) => {
        const user = await getUser(context);
        return await getServerSidePropsFunc(context, user);
    }
}

async function  getUser(ctx: any) {
    if(ctx.req.headers.cookie) {
        const {auth} = parse(ctx.req.headers.cookie)

        if(auth) {
            try {
                return verify(auth, process.env.APP_SECRET) as User;
            } catch (error) {
                return null
            }
        }
    }

    return null
}