'use client'

import Header from "@/app/components/admin/Header"
import { PlusIcon } from "@heroicons/react/24/outline"
import Input from "@/app/components/forms/Input"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { resolver } from "@/app/validations/VariantDetails"
import InputArray from "@/app/components/forms/InputArray"
import OptionSelect from "@/app/components/product/OptionSelect"
import Select from "@/app/components/forms/Select"
import Button from "@/app/components/buttons/Button"

const InsertVariantPage = () => {
    const [name, setName] = useState<string>("")
    const [displayName, setDisplayName] = useState<string>("")
    const [options, setOptions] = useState<string[]>([])

    const { register, handleSubmit, setError, setValue, formState: {errors} } = useForm<VariantInsertFormInterface>({resolver})

    return(
        <div className="flex flex-col gap-4">
            <Header
                icon={<PlusIcon width={26} height={26}/>}
                title={"Insert Variant"}
                description={"Variants let you define the different options your products can have — like sizes (S, M, L, XL), colors, or styles. Create a variant here, and you'll be able to assign it to one or more products to give your customers more choice and flexibility."}
            />
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col w-full lg:w-1/2 rounded-xl bg-white p-6 h-fit">
                    <div className="mb-6">
                        <h1 className="font-bold">Details</h1>
                        <p className="text-gray-600 text-xs">Variant options and display name for users</p>
                    </div>
                    <form className="flex flex-col gap-3">
                        <Input
                            id="name"
                            title="Name"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            value={name}
                            setter={setName}
                            placeholder={"e.g. Clothing sizes"}
                            showRequired={true}
                        />

                        <Input
                            id="display_name"
                            title="Display Name"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            value={displayName}
                            setter={setDisplayName}
                            placeholder={"e.g. size"}
                            showRequired={true}
                        />

                        <Select
                            id="select_type"
                            title="Select Type"
                            options={["button", "select"]}
                        
                        />

                        <InputArray
                            title={"Options"}
                            description={"Insert options to pick by a user each one in separate input"}
                            options={options}
                            setOptions={setOptions}
                        />
                    </form>
                </div>
                <div className="flex flex-col w-full lg:w-1/2 rounded-xl bg-white p-6 h-fit">
                    <div className="mb-6">
                        <h1 className="font-bold">Preview</h1>
                        <p className="text-gray-600 text-xs">That&apos;s how your variant picker will look alike</p>
                    </div>
                        <OptionSelect
                            variant={{display_name: displayName, id: "test", select_type: "select", options: options.map(option => ({ name: option, id: crypto.randomUUID() }))}}
                            pickOption={() => {}}
                            checkStock={() => { return 5 }}
                        />
                </div>
            </div>
            <Button>
                Add Variant
            </Button>
        </div>
    )
}

export default InsertVariantPage