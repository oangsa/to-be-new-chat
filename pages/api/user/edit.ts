import type { NextApiResponse, NextApiRequest } from 'next'
import { NextResponse,  } from 'next/server';
import prisma from '@/libs/prismadb'

export default async function edit(req: NextApiRequest, res: NextApiResponse) {

    const { name, surname, yearClass, studentId, Class, username, password, imageUrl, isUserUpdate, updateUser } = req.body
    var pass = false

    const c_1 = (name === "" || surname === "" || yearClass === "" || Class === "" || username === "" || password === "" || studentId === "" || imageUrl === "")
    const c_2 = (name === undefined || surname === undefined || yearClass === undefined || Class === undefined || username === undefined || password === undefined || studentId === undefined || imageUrl === undefined)
    
    if (c_1 && isUserUpdate === 'false' ) return res.status(200).send("Failed")
    if (c_2 && isUserUpdate === 'false' ) return res.status(200).send("Failed")
 
    const check:any[] = await prisma.student.findMany({
        where: {
            username: username
        }
    })
    const oldData:any = await await prisma.student.findFirst({
        where: {
            studentId: updateUser
        }
    })
    
    if ( check.length > 1 && isUserUpdate === 'false') {var pass = !(check[0].username === username && oldData.username !== username)}
    else if ( check.length > 1 && isUserUpdate === 'true' ) {var pass = false}
    else var pass = true
    
    if ( !pass ) return res.status(200).send("Failed")


    const profile = imageUrl === '' ? oldData.image : imageUrl

    if ( isUserUpdate === 'false' ) {
        const a = await prisma.student.update({where: {studentId: studentId}, data: {name: name, surname: surname, yearClass: yearClass, studentId: studentId, username: username, password: password, image: profile}})
        console.log(a)
    }
    if ( isUserUpdate === 'true' ) await prisma.student.update({where: {studentId: studentId}, data: {username: username !== "" ? username : oldData.username, password: password !== "" ? password : oldData.password, image: profile }})

    return res.status(200).send("Success")
    
}