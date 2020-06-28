import { db } from '../../../db'
import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from  'bcrypt'
import makeAuthCookie from '../../../utils/makeAuthCookie';

interface BodyTypes {
    email: string,
    pw: string
}

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
       const { email , pw } : BodyTypes = {
           email: req.body.email.toLowerCase(),
           pw: req.body.pw
       };

       if((!email || email.length < 6) || (!pw || pw.length < 6)) {
        res.status(400).end(); 
        return
       }

       const user = await db.users.findByEmail(<string>email)

       if(!user) {
        error(res)
        return
       }
        const isPasswordRight = await compare(pw, user.password_hash)

        if(!isPasswordRight) {
            error(res)
            return
        }
        
        const {claims, authCookie} = makeAuthCookie(user)
        
        res.setHeader('Set-Cookie', authCookie)
        res.status(200).json(claims); 
        return
    } catch (e) {
        error(res)
        return
    }
 };
  