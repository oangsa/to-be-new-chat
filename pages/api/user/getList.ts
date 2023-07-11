import prisma from '@/libs/prismadb'
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";

export default async function getList(req: NextApiRequest, res: NextApiResponse) {
    const user = await prisma.student.findMany()
    var a: any = []
    user.map((item: object) => {
        a.push(item)
    })

    return res.status(200).send(a)
}