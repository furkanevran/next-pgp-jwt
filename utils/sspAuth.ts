import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ParsedUrlQuery } from 'querystring';
import User from '../db/models/user';
import getUserFromReqCookie from './getUserFromReqCookie';

/**
 * Returns additional user parameter for getServerSideProps
 * @param getServerSidePropsFunc getServerSideProps function with (context, user) parameters
 */
export function sspAuth (getServerSidePropsFunc: (context: GetServerSidePropsContext<ParsedUrlQuery>, user: User) => GetServerSidePropsResult<{ [key: string]: any; }>){
    return async (context: any) => {
        const user = await getUserFromReqCookie(context);
        return await getServerSidePropsFunc(context, user);
    }
}