import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function add(req: NextApiRequest, res: NextApiResponse) {

    const { name, surname, studentId,  yearClass,  Class, url } = req.body

    const user = await prisma.student.create({
        data: {
            name: name,
            surname: surname,
            studentId: parseInt(studentId),
            yearClass: parseInt(yearClass),
            Class: parseInt(Class),
            username: `rs${parseInt(studentId).toString()}@rajsima.ac.th`,
            password: parseInt(studentId).toString(),
            reason: "",
            total: 0,
            oldMonth: 0,
            image: url
        }
    })

    return res.status(200).send("Success")
    
}