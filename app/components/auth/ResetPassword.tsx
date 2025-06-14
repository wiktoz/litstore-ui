'use client'

import Input from "@/app/components/forms/Input"
import { useState } from "react"
import { resolver } from "@/app/validations/ResetPasswordForm"
import { useForm } from "react-hook-form"
import Button from "@/app/components/buttons/Button"
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import api from "@/app/utils/api"

const ResetPassword = () => {
    const [email, setEmail] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSent, setIsSent] = useState<boolean>(false)

    const { register, handleSubmit, setError, setValue, formState: {errors} } = useForm<ResetPasswordInterface>({resolver})

    const handlePasswordReset = async (data: ResetPasswordInterface) => {
        setIsLoading(true)

        api("/auth/password/forgot", { 
            method: "POST",
            data
        }).then(_ => {
            setIsSent(true)
            setIsLoading(false)
        }).catch(_ => {
            setError("root", {
                type: "manual",
                message: "Incorrect e-mail or password",
            })

            setIsLoading(false)
        })
    }

    if(isSent)
        return(
            <div className="w-1/3 rounded-xl bg-white flex flex-col mx-auto p-10 py-16 border">
                <div className="p-2 bg-gray-100 border rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                    <EnvelopeIcon width={20} height={20}/>
                </div>
                <div className="my-4 flex flex-col gap-4 text-center mb-8">
                    <h1 className="text-gray-800 font-bold text-2xl mb-4">
                        Check your email
                    </h1>
                    <p className="text-xs text-gray-500 text-center">We have sent a password reset link to:</p>
                    <p className="text-gray-800 text-lg font-semibold">{email}</p>
                </div>
                <p className="my-4 text-gray-500 text-xs text-center">You can safely close this page.</p>
            </div>
        )

    return(
        <div className="w-1/3 rounded-xl bg-white flex flex-col mx-auto p-10 py-16 border">
            <div className="p-2 bg-gray-100 border rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                <KeyIcon width={20} height={20}/>
            </div>
            <div className="my-4 flex flex-col gap-4 text-center mb-8">
                <h1 className="text-gray-800 font-bold text-2xl mb-4">
                    Reset Password
                </h1>
                <p className="text-xs text-gray-500 text-left">Enter the e-mail address you used to create the account, and we will send you instructions to reset your password</p>
            </div>
            

            <form onSubmit={handleSubmit(handlePasswordReset)}>
                <Input<ResetPasswordInterface> 
                    id="email"
                    title="e-mail"
                    autoComplete="email"
                    type="text"
                    value={email}
                    setter={setEmail}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                />

                <Button isLoading={isLoading}>Reset</Button>
            </form>

            <p className="my-4 text-gray-500 text-sm">You know your password? <Link href={"/pl/auth/sign-in"} className="font-semibold text-black">Back to sign in.</Link></p>
        </div>
    )
}

export default ResetPassword