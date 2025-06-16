'use client'

import { UseFormRegister, FieldValues, Path } from "react-hook-form"
import { Dispatch, SetStateAction } from "react"

interface CheckboxProps<T extends FieldValues> {
    id: Path<T>,
    title: string,
    value: boolean,
    showRequired?: boolean,
    description: string,
    errors: { [key: string]: { message?: string } },
    register: UseFormRegister<T>,
    setter: Dispatch<SetStateAction<boolean>>,
}

const Checkbox = <T extends FieldValues>({
    id,
    title,
    value,
    showRequired,
    errors,
    description,
    register,
    setter,
}: CheckboxProps<T>) => {
    return (
        <div className="inline-flex items-start my-1">
            <label className="flex items-start cursor-pointer relative pt-1" htmlFor={String(id)}>
                <input
                    {...register(id)}
                    type="checkbox"
                    id={String(id)}
                    name={String(id)}
                    checked={value}
                    onChange={(e) => setter(e.target.checked)}
                    className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"
                    stroke="currentColor" strokeWidth="1">
                    <path fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"></path>
                </svg>
                </span>
            </label>
            <label className="cursor-pointer ml-2 text-slate-600 text-xs" htmlFor={String(id)}>
                <div>
                <p className="font-semibold">
                    {title} {showRequired && <span className="text-red-500">*</span>}
                </p>
                <p className="text-slate-500 text-xs">
                    {description}
                </p>
                </div>
            </label>
            <div className="text-red-600 text-xs text-right">{errors?.[id]?.message}</div>
        </div>
    )
}

export default Checkbox
