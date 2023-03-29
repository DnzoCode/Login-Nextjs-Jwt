import User from '@/model/User';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie';

export default async function loginHandler(req, res){

    const {email, password} = req.body

    /*const user = await User.findOne({email});

    if(!user) throw new Error("Not User found");

    const checkPassword = await compare(password, user.password)
    if(!checkPassword | user.email  !== email){
        throw new Error("Email or password incorrect");
    }*/

    if(email === "admin@local.local" && password === "admin"){
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email: 'admin@local.local',
            username: 'Daniel'
        }, 'secret');

        const serialized = serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 *24 * 30,
            path: '/'
        })
    
        res.setHeader('Set-Cookie', serialized);
        return res.json('login succes')
    }

    return res.status(401).json({error: 'Invalid credentials'});

    
}