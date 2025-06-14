'use client'

import { useState, useEffect } from "react"
import api from "@/app/utils/api"
import { CheckIcon, QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"

const ConfirmEmail = ({token}:{token:string}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [countdown, setCountdown] = useState<number | null>(null)

    const Router = useRouter()

    

    useEffect(() => {
        const resendEmail = async () => {
            api("/auth/email/verify", { 
                method: "POST",
                data: {
                    token: token,
                }
            }).then(() => {
                setIsSuccess(true)
                setIsLoading(false)
                setCountdown(10)
            }).catch(() => {
                setIsSuccess(false)
                setIsLoading(false)
            })
        }
        
        resendEmail()
    }, [token])

    useEffect(() => {
        if (countdown === null) 
            return

        if (countdown === 0)
            return Router.push("/pl/auth/sign-in")
            
        const timer = setTimeout(() => {
            setCountdown(countdown - 1)
        }, 1000)

        return () => clearTimeout(timer)
    }, [countdown, Router])

    if(isSuccess)
        return(
            <div className="w-1/3 rounded-xl bg-white flex flex-col mx-auto p-10 py-16 border">
                <div className="p-2 bg-gray-100 border rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                    <CheckIcon width={20} height={20}/>
                </div>
                <div className="my-4 flex flex-col gap-4 text-center mb-8">
                    <h1 className="text-gray-800 font-bold text-2xl mb-4">
                        Confirmed
                    </h1>
                    <p className="text-xs text-gray-500 text-center">Account is now confirmed! You can start exploring all the features and enjoy full access.</p>
                </div>

                <div className="mt-4 text-gray-500 text-sm text-center">
                    You will be redirected to <span className="font-semibold">Sign In</span> in {countdown}s.
                </div>
            </div>
        )
    
    return(
        <div className="w-1/3 rounded-xl bg-white flex flex-col mx-auto p-10 py-16 border">
            <div className="p-2 bg-gray-100 border rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                {
                    isLoading ?
                    <QuestionMarkCircleIcon width={20} height={20}/> :
                    <XMarkIcon width={20} height={20}/>
                }
            </div>
            <div className="my-4 flex flex-col gap-4 text-center mb-8">
                <h1 className="text-gray-800 font-bold text-2xl mb-4">
                    {
                        isLoading ?
                        "Confirming..." :
                        "Not Confirmed"
                    }
                </h1>
                <p className="text-xs text-gray-500 text-center">
                    {
                        isLoading ?
                        "We are trying to confirm your email." :
                        "We cannot confirm your account. Perhaps your token is invalid or expired."
                    }
                </p>
            </div>
        </div>
    )
}

export default ConfirmEmail