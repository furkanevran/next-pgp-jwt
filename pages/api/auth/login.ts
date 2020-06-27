import { db } from '../../../db'
import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from  'bcrypt'
import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
import makeAuthCookie from '../../../utils/makeAuthCookie';

const error = (res: NextApiResponse) => {
    let message = "Wrong e-mail or password.";
    let code = 400;
    res.status(code).json({message});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "POST") {
        res.status(405).end();
        return
    }

    try {
       const {email , pw } = req.body;

       if((!email || email.length < 6) || (!pw || pw.length < 6)) {
        res.status(400).end(); 
        return
       }

       const post = await db.users.findByEmail(<string>email)

       if(!post) {
        error(res)
        return
       }
        const isPasswordRight = await compare(pw, post.password_hash)

        if(!isPasswordRight) {
            error(res)
            return
        }
        
        const {claims, authCookie} = makeAuthCookie(post)
        
        res.setHeader('Set-Cookie', authCookie)
        res.status(200).json(claims); 
        return
    } catch (e) {
        error(res)
        return
    }
 };
  