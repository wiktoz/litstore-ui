import { useState } from "react"

interface SelectInterface {
    id: string,
    title: string,
    autoComplete?: string,
    value?: string,
    options: string[],
    showRequired?: boolean,
}

interface InputArrayOption {
    id: string,
    value: string
}

export default function Select({id, title, autoComplete, value, options, showRequired}:SelectInterface){
    const optionsToInputArray = (opts:string[]) => {
            return opts.map(option => {
                return { id: crypto.randomUUID(), value: option }
            })
        }
        
    const [inputs, setInputs]
        = useState<InputArrayOption[]>(options && options.length > 0 ? optionsToInputArray(options) : [])

    return(
        <div className="col-span-12">
            <label htmlFor={String(id)} className="block text-xs text-gray-700 px-1 font-medium">
                {title} { showRequired && <span className="text-red-500">*</span> }
            </label>
            <select
                id={id}
                name={id}
                autoComplete={autoComplete}
                className="text-gray-900 bg-gray-50 text-sm my-1 block w-full rounded-lg border border-gray-300 p-2 px-3 shadow-sm focus:border-gray-500 focus:outline-none ring-0 focus:ring-0"
                defaultValue={value}
            >
                <option hidden className={"text-gray-500"}>{title}</option>
                {
                    inputs.map((item: InputArrayOption) => {
                        return(
                            <option 
                                value={item.id} 
                                key={item.id} 
                            >
                                {item.value}
                            </option>
                        )
                    })                
                }
            </select>
        </div>
    )
}