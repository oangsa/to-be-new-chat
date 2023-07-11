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
    for (let i: number = 1; i <= 6; i++) {
        const result: any = await prisma.student.findMany({
            where: {
                yearClass: i
            }
        })
        var month: any = 0
        var total: any = 0
        result.map((item:any) => {
            month = month + item.oldMonth,
            total = total + item.total
        })
        data.month.push(month)
        data.total.push(total)
    }

    return res.status(405).send(data)
}