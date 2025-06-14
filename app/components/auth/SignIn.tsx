'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import api from "@/app/utils/api"
import Input from "@/app/components/forms/Input"
import { useForm } from "react-hook-form"
import { resolver } from "@/app/validations/SignInForm"
import Button from "../buttons/Button"
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline"
import { mutate } from "swr"

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { register, handleSubmit, setError, setValue, formState: {errors} } = useForm<SignInFormInterface>({resolver})

    const Router = useRouter()

    const handleSignIn = async (data: SignInFormInterface) => {
        setIsLoading(true)

        await api("/auth/login", { 
            method: "POST",
            data
        }).then(() => {
            mutate(() => true)
            
            Router.push('/pl/user/profile')

            setIsLoading(false)
        }).catch(() => {
            setError("root", {
                type: "manual",
                message: "Incorrect e-mail or password",
            })

            setIsLoading(false)
        })
    }

    return (
        <div className="md:w-1/3 rounded-xl bg-white flex flex-col mx-auto p-10 py-16 border">
            <div className="p-2 bg-gray-100 border rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                <ArrowRightEndOnRectangleIcon width={20} height={20}/>
            </div>
            <div className="my-4 flex flex-col gap-4 text-center mb-8">
                <h1 className="text-gray-800 font-bold text-2xl mb-4">
                    Sign In
                </h1>
                <p className="text-xs text-gray-500 text-left">Welcome back — we missed you! Log in to pick up where you left off.</p>
            </div>
            

            <form onSubmit={handleSubmit(handleSignIn)}>
                <div>
                    <Input<SignInFormInterface> 
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
                    <Input<SignInFormInterface> 
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

                <Button isLoading={isLoading}>Sign In</Button>
            </form>

            <p className="mt-4 text-gray-500 text-sm">Forgot your password? <Link href={"/pl/auth/password/reset"} className="font-semibold text-black">Reset password.</Link></p>
            <p className="mb-4 mt-2 text-gray-500 text-sm">Don&apos;t have an account? <Link href={"/pl/auth/sign-up"} className="font-semibold text-black">Sign Up.</Link></p>
        </div>
    )
}

export default SignIn