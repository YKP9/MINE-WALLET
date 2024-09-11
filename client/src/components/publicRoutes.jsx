import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function PublicRoute(props) {
    const[cookies] = useCookies(["token"])
    const navigate = useNavigate()

    useEffect(()=>{
        if(cookies.token){
            navigate("/")
        }
    },[cookies.token])
  return (
    <div>
      {props.children}
    </div>
  )
}

