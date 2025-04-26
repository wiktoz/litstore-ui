'use client'

import { UseFormRegister } from "react-hook-form"
import { Dispatch, SetStateAction } from "react"

interface Props {
    id: string,
    title: string,
    type?: string,
    value: string,
    autoComplete?: string,
    errors: { [key: string]: { message?: string } },
    register: UseFormRegister<any>,
    setter: Dispatch<SetStateAction<string>>,
}

const Input = ({id, title, type, value, autoComplete, errors, register, setter}:Props) => {
    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-xs text-gray-700 px-1">
                {title}
            </label>
            <input
                { ...register ? register(id) : ""}
                type={type ? type : "text"}
                id={id}
                name={id}
                autoComplete={autoComplete ? autoComplete : "off"}
                value={value}
                onChange={ e => { setter(e.target.value) }}
                className={"w-full my-1 p-2 border border-gray-300 px-3 text-gray-900 text-sm rounded-lg " +
                    "focus:outline-none focus:border focus:border-gray-800 block ring-0 focus:ring-0 " +
                    (errors ? errors[id] ? "border-red-600" : "" : "")}
            />
            <div className="text-red-600 text-xs">{ errors ? errors[id]?.message : ""}</div>
        </div>
    )
}

export default Input