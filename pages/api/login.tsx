import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { getJwtSecretKey } from '@/libs/auth'
import prisma from '@/libs/prismadb'
import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    const {username, password} = req.body

    var isAdmin = false

    try {
        
        console.log(username, password)

        if (username === "admin" && password === "password") isAdmin = true

        const user = await prisma.student.findFirst({
            where: {
                username: username,
                password: password
            }
        })

        
        if (!user) return res.status(205).send("User is not valid.")
        
        
        const token = await new SignJWT({})
            .setProtectedHeader({ alg: 'HS256', studentId: user.studentId , username: user.username, password: user.password, isAdmin: isAdmin === true ? true : false })
            .setJti(nanoid())
            .setExpirationTime('30 days')
            .sign(new TextEncoder().encode(getJwtSecretKey()))
        
        res.setHeader('Set-Cookie', cookie.serialize('user-token', token, {
            path: '/',
            httpOnly: false,
            sameSite: "strict"
        }))
        
        console.log("done")
        return res.status(200).send("success")

    } catch (err) {
        console.log(err)
        return res.status(404).send(err)
    }
}