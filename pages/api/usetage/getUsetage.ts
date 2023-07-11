import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"
import { NextApiRequest, NextApiResponse } from "next"
export default async function getUsetage(req: NextApiRequest, res: NextApiResponse) {
    const data = await prisma.count.findFirst()
    if(data === null) return res.status(200).send("Error: Student Is Undefined")
    return res.status(200).send(data)
}