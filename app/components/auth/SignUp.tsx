'use client'

import { useState } from "react"
import Link from "next/link"
import api from "@/app/utils/api"
import Input from "@/app/components/forms/Input"
import { useForm } from "react-hook-form"
import { resolver } from "@/app/validations/SignUpForm"
import Button from "../buttons/Button"
import { CheckIcon, EnvelopeIcon, SparklesIcon } from "@heroicons/react/24/outline"
import Spinner from "../loaders/Spinner"

const SignUp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSent, setIsSent] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const [resendMessage, setResendMessage] = useState<string>("")

    const { register, handleSubmit, setError, setValue, formState: {errors} } = useForm<SignUpFormInterface>({resolver})

    const handleSignIn = async (data: SignUpFormInterface) => {
        setIsLoading(true)

        api("/auth/register", { 
            method: "POST",
            data: {
                email: data.email,
                password: data.password
            }
        }).then(() => {
            setIsSent(true)
            setIsLoading(false)
        }).catch(err => {
            setError("root", {
                type: "manual",
                message: err.response?.data?.message || "Something went wrong. Try again later.",
            })

            setIsLoading(false)
        })
    }

    const resendEmail = async () => {
        setIsLoading(true)

        await api("/auth/email/resend", { 
            method: "POST",
            data: {
                email: email,
            }
        }).then(() => {
            setResendMessage("Verification email resent!")
            setIsLoading(false)
        }).catch(() => {
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
                    <p className="text-xs text-gray-500 text-center">We have sent a verification link to:</p>
                    <p className="text-gray-800 text-lg font-semibold">{email}</p>
                </div>

                <div className="mt-4 text-gray-500 text-sm">
                    {
                        resendMessage ? 
                        <div className="flex items-center justify-center gap-1">
                            <CheckIcon width={18} height={18}/>
                            {resendMessage}
                        </div>
                        :
                        <div className="flex items-center justify-center gap-1">
                            <p>Didn&apos;t receive the email?</p>
                            {
                                isLoading ? 
                                <Spinner/>
                                :
                                <span className="font-semibold text-black cursor-pointer" onClick={() => resendEmail()}>Resend.</span>
                            }
                        </div>
                    }
                    
                </div>
            </div>
        )

    return (
        <div className="w-1/3 rounded-xl bg-white flex flex-col mx-auto p-10 py-16 border">
            <div className="p-2 bg-gray-100 border rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                <SparklesIcon width={20} height={20}/>
            </div>
            <div className="my-4 flex flex-col gap-4 text-center mb-8">
                <h1 className="text-gray-800 font-bold text-2xl mb-4">
                    Sign Up
                </h1>
                <p className="text-xs text-gray-500 text-left">We&apos;re excited to have you! Create your account and join the community.</p>
            </div>
            

            <form onSubmit={handleSubmit(handleSignIn)}>
                <div>
                    <Input<SignUpFormInterface> 
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
                </div>
                <div>
                    <Input<SignUpFormInterface> 
                        id="password"
                        title="password"
                        autoComplete="current-password"
                        type="password"
                        value={password}
                        setter={setPassword}
                        errors={errors}
                        register={register}
                        setValue={setValue}
                    />
                </div>
                <div>
                    <Input<SignUpFormInterface> 
                        id="repeat_password"
                        title="repeat password"
                        autoComplete="current-password"
                        type="password"
                        value={repeatPassword}
                        setter={setRepeatPassword}
                        errors={errors}
                        register={register}
                        setValue={setValue}
                    />
                </div>

                <Button isLoading={isLoading}>Sign Up</Button>
            </form>

            <p className="mt-4 text-gray-500 text-sm">Already have account? <Link href={"/pl/auth/sign-in"} className="font-semibold text-black">Sign In.</Link></p>
        </div>
    )
}

export default SignUp