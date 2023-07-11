import { NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/prismadb"
import { NextApiRequest, NextApiResponse } from "next"
export default async function getRecent(req: NextApiRequest, res: NextApiResponse) {
    
    const data = await prisma.student.findMany({
        orderBy: [
            {
                timestamps: "desc"
            }
        ],
        take: 12
    })

    if (data === null) res.status(200).send("Error")

    return res.status(200).send(data)
}