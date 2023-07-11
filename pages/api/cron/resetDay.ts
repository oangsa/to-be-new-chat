import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

export default async function resetDay(req: NextApiRequest, res: NextApiResponse ) {
    try {

        const response = await prisma.count.findFirst({})

        await prisma.count.updateMany({
            data: {
                curDay: 0,
                oldDay: response?.curDay
            }
        })
        
        return res.status(200).send("Success")
    }
    catch (err) {
        return res.status(404).send("Error")
    }
}