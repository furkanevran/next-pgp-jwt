import { NextApiRequest, GetServerSidePropsContext } from "next";
import User from "../db/models/user";
import { verify } from "jsonwebtoken";
import { parse } from 'cookie';
import { ParsedUrlQuery } from "querystring";

export default (reqtx : NextApiRequest & GetServerSidePropsContext<ParsedUrlQuery>) : User | null => {
    const myReq = reqtx.req ?? reqtx

    if(myReq.headers.cookie) {
        const {auth} = parse(myReq.headers.cookie)

        if(auth) {
            try {
                return <User>(verify(auth, process.env.APP_SECRET, {
                    algorithms: ['HS256']
                }));
            } catch (error) {
                return null
            }
        }
    }

    return null
}