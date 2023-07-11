import { getCookie } from "cookies-next"
import jwtDecode from "jwt-decode"

export default async function getDataByCookie() {
    const s: any = getCookie('user-token') 
    if (s === undefined) return undefined
    const token: any = s === undefined ? undefined : jwtDecode(s, {header: true})
    const a = await fetch(`/api/user/getuserbysid?sid=${token.studentId.toString()}`)
    return await a.json()
}