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
    var old = 1
    var month: number = 0
    var total: number = 0
    const result: any = await prisma.student.findMany({
        orderBy: [
            {
                yearClass: "asc"
            }
        ],
    })

    result.map((item: any) => {
        if (item.yearClass !== old) {
            data.month.push(month)
            data.total.push(total)
            month = 0
            total = 0
            old = old + 1
            return
        }
        month = month + item.oldMonth,
        total = total + item.total
    })
    data.month.push(month)
    data.total.push(total)

    // var data: any = {
    //     month: [],
    //     total: []
    // }
    // for (let i: number = 1; i <= 6; i++) {
    //     const result: any = await prisma.student.findMany({
    //         where: {
    //             yearClass: i
    //         }
    //     })
    //     var month: any = 0
    //     var total: any = 0
    //     result.map((item:any) => {
    //         month = month + item.oldMonth,
    //         total = total + item.total
    //     })
    //     data.month.push(month)
    //     data.total.push(total)
    // }
    // console.log(data)

    return res.status(200).send(data)
}