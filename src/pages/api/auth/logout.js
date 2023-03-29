import { verify } from "jsonwebtoken";
import { serialize } from 'cookie';  

export default function logoutHandler(req, res){
    const {myTokenName} = req.cookies;


    if(!myTokenName) {
        return res.status(401).json({error: 'no Token'})
    }

    try {
        verify(myTokenName, 'secret');
        const serialized = serialize('myTokenName', null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        });
        res.setHeader('Set-Cookie', serialized);
        res.status(200).json('logout succes');
    } catch (error) {
        return res.status(401).json({error: 'invalid token'})
    }
}