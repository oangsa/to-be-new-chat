
import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../libs/prismadb'
import { NextApiRequest, NextApiResponse } from "next";

export default async function getuserbysid(req: NextApiRequest, res: NextApiResponse) {
    const { sid } : any = req.query

    const user = await prisma.student.findFirst({
        where: {
            studentId: parseInt(sid)
        },
    })

    return res.status(200).send(user)
}