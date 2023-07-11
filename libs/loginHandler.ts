export default async function loginHandler(username: string, password: string) {
    const res = await fetch("/api/login", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    console.log(res.status)
    
    return await res.status
}