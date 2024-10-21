import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function PublicRoute(props) {
    const[cookies] = useCookies(["accessToken"])
    const navigate = useNavigate()

    useEffect(()=>{
        if(cookies.accessToken){
            navigate("/")
        }
    },[cookies.accessToken])
  return (
    <div>
      {props.children}
    </div>
  )
}

