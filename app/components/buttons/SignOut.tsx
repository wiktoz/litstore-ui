'use client'

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"
import api from "@/app/utils/api"
import { useRouter } from "next/navigation"
import { mutate } from 'swr'

const SignOut = () => {
    const Router = useRouter()

    const handleSignOut = async () => {
        api("/auth/logout", { 
            method: "POST",
        }).then(() => {
            mutate(() => true)
            Router.push('/')
        })
    }


    return(
        <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-gray-400 transition" onClick={() => handleSignOut()}>
            <ArrowLeftStartOnRectangleIcon width={19} height={19} />
            <p>Sign Out</p>
        </div>
    )
}

export default SignOut