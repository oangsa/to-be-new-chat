import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"
import { NextApiRequest, NextApiResponse } from "next"

interface data {
    month: number[]
    total: number[]
}
export default async function getUsetageByYear(req: NextApiRequest, res: NextApiResponse) {
    var data: data  = {
        month: [],
        total: []
    }
    const result: any = await prisma.count.findFirst()

    data.month = result.graphMonth
    data.total = result.graphToTal
    
    

    return res.status(200).send(data)
}