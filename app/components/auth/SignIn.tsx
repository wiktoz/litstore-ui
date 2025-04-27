'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import Spinner from "@/app/components/loaders/Spinner"
import Link from "next/link"
import api from "@/app/utils/api"
import Input from "@/app/components/forms/Input"
import { useForm } from "react-hook-form"
import { resolver } from "@/app/validations/SignInForm"

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { register, handleSubmit, setError, formState: {errors} } = useForm<SignInFormInterface>({resolver})

    const Router = useRouter()

    const handleSignIn = async (data: SignInFormInterface) => {
        setIsLoading(true)

        api("/auth/login", { 
            method: "POST",
            data
        }).then(_ => {
            Router.push('/user/profile')
        }).catch(_ => {
            setError("root", {
                type: "manual",
                message: "Incorrect e-mail or password",
            })
        })
    }

    return (
        <>
        <div className="flex w-full items-center justify-center py-12 px-2 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Sign In
                    </h2>
                </div>
                <div className="-space-y-px rounded-md shadow-sm">
                    <form onSubmit={handleSubmit(handleSignIn)}>
                        <div>
                            <Input 
                                id="email"
                                title="e-mail"
                                autoComplete="email"
                                type="email"
                                value={email}
                                setter={setEmail}
                                errors={errors}
                                register={register}
                            />
                        </div>
                        <div>
                            <Input
                                id="password"
                                title="password"
                                autoComplete="current-password"
                                type="password"
                                value={password}
                                setter={setPassword}
                                errors={errors}
                                register={register}
                            />
                        </div>
                        <div className="flex items-center justify-between my-2">
                            <div className="text-xs">
                                <Link href={"/auth/password/reset"} className="font-medium text-gray-600 hover:text-gray-500">
                                Forgot your password?
                                </Link>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={"w-full group relative flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-semibold text-white focus:outline-none " + (!email || !password || isLoading ? "opacity-70 hover:cursor-default hover:bg-gray-600" : "hover:bg-gray-700")}
                            >
                                {
                                    isLoading ? <Spinner/> : "Sign in"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default SignIn