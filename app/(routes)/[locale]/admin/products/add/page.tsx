'use client'

import Header from "@/app/components/admin/Header"
import FileUpload from "@/app/components/forms/FilesUpload"
import Input from "@/app/components/forms/Input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { resolver } from "@/app/validations/ProductDetails"
import Checkbox from "@/app/components/forms/Checkbox"
import RangeCalendar from "@/app/components/forms/RangeCalendar"
import ContentOnCheckbox from "@/app/components/forms/ContentOnCheckbox"
import { ClockIcon, PlusIcon } from "@heroicons/react/24/outline"
import Button from "@/app/components/buttons/Button"

const getDateOnly = (date:Date): string => {
    return date.toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

const InsertProductPage = () => {
    const [files, setFiles] = useState<File[]>([])
    const [name, setName] = useState<string>("")
    const [manufacturer, setManufacturer] = useState<string>("")
    const [isNew, setIsNew] = useState<boolean>(false)
    const [isActive, setIsActive] = useState<boolean>(true)

    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(null)

    const [isDateRange, setIsRangeDate] = useState<boolean>(false)

    const { register, handleSubmit, setError, setValue, formState: {errors} } = useForm<ProductInsertFormInterface>({resolver})

    return(
        <div className="flex flex-col gap-4">
            <Header
                icon={<PlusIcon width={26} height={26}/>}
                title={"Insert Product"}
                description={"Welcome to your product editor — where adding something new is quick, simple, and seamless. Just fill in the essentials, and your next bestseller is ready to shine."}
            />
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col w-full lg:w-3/5 rounded-xl bg-white p-6 h-fit">
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
                            <p className="text-xs text-gray-700 font-medium mx-1">Availability dates</p>
                            <div className="flex flex-col 2xl:flex-row justify-center items-center my-2 border rounded-xl bg-gray-50">
                                <div className="2xl:w-7/12 rounded-xl bg-white">
                                    <div className="p-5">
                                        <RangeCalendar
                                            startDate={startDate}
                                            setStartDate={setStartDate}
                                            endDate={endDate}
                                            setEndDate={setEndDate}
                                        />
                                    </div>
                                </div>
                                <div className="2xl:w-5/12 flex flex-col gap-4 py-4">
                                {
                                    startDate &&
                                    <div className="px-5"> 
                                        <div className="font-semibold text-sm">
                                            od
                                        </div>
                                        <div className="flex gap-2 items-center text-sm">
                                            <div className="text-3xl font-thin">
                                                {startDate.getDate()}
                                            </div>
                                            <div className="leading-none flex flex-col grow">
                                                <p>{startDate.toLocaleString("pl-PL", { month: 'long' })} {startDate.getFullYear()}</p>
                                                <p className="text-gray-500">{startDate.toLocaleDateString("pl-PL", { weekday: 'long' })}</p>
                                            </div>
                                            <div className="ml-2 flex items-center justify-center border rounded-xl p-2 cursor-pointer gap-1.5">
                                                <ClockIcon width={20} height={20}/>
                                                <p>{startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    endDate &&
                                    <div className="px-5">
                                        <div className="font-semibold text-sm">
                                            do
                                        </div>
                                        <div className="flex gap-2 items-center text-sm">
                                            <div className="text-3xl font-thin">
                                                {endDate.getDate()}
                                            </div>
                                            <div className="leading-none flex flex-col grow">
                                                <p>{endDate.toLocaleString("pl-PL", { month: 'long' })} {endDate.getFullYear()}</p>
                                                <p className="text-gray-500">{endDate.toLocaleDateString("pl-PL", { weekday: 'long' })}</p>
                                            </div>
                                            <div className="ml-2 flex items-center justify-center border rounded-xl p-2 cursor-pointer gap-1.5">
                                                <ClockIcon width={20} height={20}/>
                                                <p>12:00</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                                </div>
                            </div>
                        </ContentOnCheckbox>
                    </form>
                </div>
                <div className="flex flex-col w-full lg:w-2/5 rounded-xl bg-white p-6 h-fit">
                    <div className="mb-6">
                        <h1 className="font-semibold">Images</h1>
                        <p className="text-gray-600 text-xs">Stunning visuals that bring your product to life.</p>
                    </div>
                    <FileUpload files={files} setFiles={setFiles} multiple={true} />
                </div>
            </div>
            <Button>
                    Add Product
                </Button>
            
        </div>
    )
}

export default InsertProductPage