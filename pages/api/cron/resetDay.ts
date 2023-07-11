import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

export default async function resetDay(req: NextApiRequest, res: NextApiResponse ) {
    try {

        const res = await prisma.count.findFirst({})

        await prisma.count.updateMany({
            data: {
                curDay: 0,
                oldDay: res?.curDay
            }
        })
        
        return res.status(200).send("Success")
    }
    catch (err) {
        return res.status(404).send("Error")
    }
}