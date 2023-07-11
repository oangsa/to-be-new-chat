import { NextRequest, NextResponse } from "next/server";
import prisma from '@/libs/prismadb'
import { NextApiRequest, NextApiResponse } from "next";

export default async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    const { sid } : any = req.query

    const user = await prisma.student.delete({
        where: {
            studentId: parseInt(sid)
        },
    })

    console.log(await user)

    return res.status(200).send("success")
}