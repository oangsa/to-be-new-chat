import { getCookie } from "cookies-next"
import jwtDecode from "jwt-decode"

export default function checkCookie() {

    const cookie: any = getCookie("user-token")  
    
    const token: any = cookie === undefined ? undefined : jwtDecode(cookie, {header: true})

    console.log(token)
    
    return token

 }