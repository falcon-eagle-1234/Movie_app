'use client'

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeIcon(){

   const {theme, setTheme} = useTheme()
   const [mounted, setMounted] = useState(false)
useEffect(()=>{
    setMounted(true)
},[])
if (!mounted) return null
const changeButton = () =>{
    if (theme == "dark"){
        setTheme("light")
    }else{
        setTheme("dark")
    }
}




    const renderIcon = () => {
        if(theme == "dark"){
            return(
                <Sun/>
            )
        }
        return(<Moon/>)
    }
    return(
        <div onClick={() => changeButton()}>
{renderIcon()}
        </div>
    )
}