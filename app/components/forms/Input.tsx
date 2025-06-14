'use client'

import { UseFormRegister } from "react-hook-form"
import { Dispatch, SetStateAction } from "react"
import { UseFormSetValue, FieldValues, Path, PathValue } from "react-hook-form"

interface InputProps<T extends FieldValues> {
    id: Path<T>,
    title: string,
    type?: string,
    value: string,
    autoComplete?: string,
    errors: { [key: string]: { message?: string } },
    setValue: UseFormSetValue<T>,
    register: UseFormRegister<T>,
    setter: Dispatch<SetStateAction<string>>,
}

const Input = <T extends FieldValues>({id, title, type, value, autoComplete, errors, register, setter, setValue}:InputProps<T>) => {
    return (
        <div className="w-full">
            <label htmlFor={String(id)} className="block text-xs text-gray-700 px-1">
                {title}
            </label>
            <input
                { ...register(id)}
                type={type ? type : "text"}
                id={String(id)}
                name={String(id)}
                autoComplete={autoComplete ? autoComplete : "off"}
                value={value}
                onChange={ e => { setter(e.target.value); setValue(id, e.target.value as PathValue<T, Path<T>>) }}
                className={"w-full my-1 p-2 border border-gray-300 px-3 text-gray-900 text-sm rounded-lg " +
                    "focus:outline-none focus:border focus:border-gray-800 block ring-0 focus:ring-0 " +
                    (errors ? errors[id] ? "border-red-600" : "" : "")}
            />
            <div className="text-red-600 text-xs text-right">{ errors ? errors[id]?.message : ""}</div>
        </div>
    )
}

export default Input