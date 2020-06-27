import { NextApiRequest } from "next";
import User from "../db/models/user";
import { verify } from "jsonwebtoken";
import { parse } from 'cookie';

export default (req: NextApiRequest) : User => {
    if(req.headers.cookie) {
        const {auth} = parse(req.headers.cookie)

        if(auth) {
            try {
                return <User>(verify(auth, process.env.APP_SECRET));
            } catch (error) {
                return null
            }
        }
    }

    return null
}