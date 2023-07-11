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

    // result.map((item: any) => {
    //     if (item.yearClass !== old) {
    //         data.month.push(month)
    //         data.total.push(total)
    //         month = 0
    //         total = 0
    //         old = old + 1
    //         return
    //     }
    //     month = month + item.oldMonth,
    //     total = total + item.total
    // })
    // data.month.push(month)
    // data.total.push(total)

    for (let i = 0; i < result.length; i++) {
        const item = result[i];
        
        if (item.yearClass !== old) {
            data.month.push(month);
            data.total.push(total);
            month = 0;
            total = 0;
            old = old + 1;
            continue;
        }
        
        month += item.oldMonth;
        total += item.total;
    }
    
    data.month.push(month);
    data.total.push(total);

    return res.status(200).send(data)
}