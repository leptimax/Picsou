export const RefreshToken = () =>{
    const now = Date.now() / 1000
    const access_expire = JSON.parse(localStorage.getItem("access_expire"))
    if (now > access_expire){
        RemoveToken()
    }
    else{
        localStorage.setItem("access_expire",JSON.stringify(Date.now() / 1000 + 900))
    }
}

export const RemoveToken = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("access_expire")
}

export const SetToken = (data:object) => {
    localStorage.setItem("user",JSON.stringify(data))
    localStorage.setItem("access_expire",JSON.stringify(Date.now() / 1000 + 900))
}