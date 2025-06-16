'use client'

import Header from "@/app/components/admin/Header"
import FileUpload from "@/app/components/forms/FilesUpload"
import Input from "@/app/components/forms/Input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { resolver } from "@/app/validations/ProductDetails"
import Checkbox from "@/app/components/forms/Checkbox"
import Calendar from "@/app/components/forms/Calendar"
import ContentOnCheckbox from "@/app/components/forms/ContentOnCheckbox"

const InsertProductPage = () => {
    const [files, setFiles] = useState<File[]>([])
    const [name, setName] = useState<string>("")
    const [manufacturer, setManufacturer] = useState<string>("")
    const [isNew, setIsNew] = useState<boolean>(false)
    const [isActive, setIsActive] = useState<boolean>(true)

    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

    const [isDateRange, setIsRangeDate] = useState<boolean>(false)

    const { register, handleSubmit, setError, setValue, formState: {errors} } = useForm<ProductInsertFormInterface>({resolver})

    return(
        <div className="flex flex-col gap-4">
            <Header/>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full md:w-1/2 rounded-xl bg-white p-6 h-fit">
                    <div className="mb-6">
                        <h1 className="font-bold">Details</h1>
                        <p className="text-gray-600 text-xs">Key info to describe and display your product.</p>
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
                            placeholder={"e.g. Natural Glow Face Moisturizer"}
                            showRequired={true}
                        />
                        <Input
                            id="manufacturer"
                            title="Manufacturer"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            value={manufacturer}
                            setter={setManufacturer}
                            placeholder={"e.g. Givenchy"}
                            showRequired={true}
                        />

                        <Checkbox
                            id="new"
                            title="New"
                            description="Display a 'new' badge on product"
                            value={isNew}
                            setter={setIsNew}
                            register={register}
                            errors={errors}
                        />

                        <Checkbox
                            id="active"
                            title="Active"
                            description="Display product for users. Required to sell product."
                            value={isActive}
                            setter={setIsActive}
                            register={register}
                            errors={errors}
                        />

                        <Checkbox
                            id="date_range"
                            title="Set availability dates"
                            description="Choose a 'from' and 'to' date to control when the product is sold."
                            value={isDateRange}
                            setter={setIsRangeDate}
                            register={register}
                            errors={errors}
                        />

                        <ContentOnCheckbox isChecked={isDateRange}>
                        <div className="flex flex-col w-80">
                            <Calendar
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                            />
                            <p>Od: { startDate && startDate.toLocaleString()}</p>
                            <p>Do: { endDate && endDate.toLocaleString()}</p>
                        </div>
                        </ContentOnCheckbox>
                        
                    </form>
                </div>
                <div className="flex flex-col w-full md:w-1/2 rounded-xl bg-white p-6 h-fit">
                    <div className="mb-6">
                        <h1 className="font-semibold">Images</h1>
                        <p className="text-gray-600 text-xs">Stunning visuals that bring your product to life.</p>
                    </div>
                    <FileUpload files={files} setFiles={setFiles} multiple={true} />
                </div>
            </div>
            
            
        </div>
    )
}

export default InsertProductPage