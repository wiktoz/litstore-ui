'use client'

import {Dispatch, SetStateAction, useCallback, useState} from "react"
import {FileRejection, useDropzone} from 'react-dropzone'
import Image from "next/image"
import { Reorder } from "framer-motion"
import { PhotoIcon, CursorArrowRippleIcon, CursorArrowRaysIcon, XMarkIcon } from "@heroicons/react/24/outline"

interface FileUploadInterface {
    title?: string,
    files: File[], 
    setFiles: Dispatch<SetStateAction<File[]>>,
    multiple: boolean
}

const FileUpload = ({title, files, setFiles, multiple}:FileUploadInterface) => {
    const [errors, setErrors] = useState<string[]>([])

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if(!multiple) setFiles([...acceptedFiles])
        else setFiles([...files, ...acceptedFiles])

        setErrors([])

        rejectedFiles.forEach((file) => {
            const err = file.errors[0]

            if (err.code === "file-too-large")
                setErrors([...errors, "File cannot be uploaded. Max size is 10MB."])

            if (err.code === "file-invalid-type")
                setErrors([...errors, "File cannot be uploaded. File type must be .png, .jpg, .jpeg, .gif."])

        })
    }, [multiple, setFiles, files, errors])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
        },
        maxSize: 1e7,
        multiple: multiple
    })

    const removeFile = (file: File) =>{
        const updatedList = [...files]
        updatedList.splice(files.indexOf(file), 1)
        setFiles(updatedList)
    }

    const printFileName = (name: string) => {
        return name.length > 10 ? name.slice(0, 10) + "..." : name
    }

    return(
        <div className={"flex flex-col gap-4 text-sm"}>
            {
                title &&
                <div className={"block text-xs text-gray-700 px-1"}>
                    {title}
                </div>
            }
            <div {...getRootProps()} className={"hover:cursor-pointer flex flex-col gap-2 p-4 h-32 items-center justify-center rounded-lg border border-gray-300 " +
                (isDragActive ? "border-dashed border-gray-500 bg-gray-100" : "bg-gray-50")}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <div className={"py-4 px-2 flex flex-col items-center gap-1"}>
                            <PhotoIcon width={20} height={20}/>
                            Drop your image here
                        </div> :
                        <div className={"py-4 px-2 flex flex-col items-center gap-2 text-gray-700 text-center"}>
                            <PhotoIcon width={20} height={20}/>
                            <p>Drop your image here, or <span className="font-semibold">click to browse</span></p>
                        </div>
                }
            </div>
            {
                files && files.length > 0 &&
                <div className={"flex flex-col gap-2 rounded-lg bg-white"}>
                    <Reorder.Group axis="x" values={files} onReorder={setFiles}
                                   className={"flex flex-row gap-2 overflow-auto scroll-light"}>
                        {
                            files.map((file, i) => {
                                return (
                                    <Reorder.Item 
                                        key={file.name} value={file}
                                        className={"overflow-hidden flex flex-col rounded-lg " + (i == 0 ? "border-2 border-black" : "border border-gray-300")}
                                    >

                                        <div className={"flex flex-row items-center justify-between bg-gray-50 p-2 py-3"}>
                                            <div className={"text-xs flex flex-row items-center gap-1 " + (i==0 && "font-semibold")}>
                                                <PhotoIcon width={14} height={14}/>
                                                {printFileName(file.name)}
                                            </div>
                                            <div onClick={() => removeFile(file)} className={"hover:cursor-pointer"}>
                                                <XMarkIcon width={16} height={16} className="text-red-500" strokeWidth={2.15}/>
                                            </div>
                                        </div>

                                        <div className={"relative w-36 h-36"}>
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                fill={true}
                                                draggable={false}
                                                style={{objectFit:"cover"}}
                                                className={""}
                                            />
                                            {
                                                i == 0 &&
                                                <div className="absolute bottom-0 right-0 rounded-tl-xl bg-black text-white p-1 pl-1.5 text-xs">
                                                    Cover
                                                </div>
                                            }
                                        </div>

                                    </Reorder.Item>
                                )
                            })
                        }
                    </Reorder.Group>
                    <div className={"text-xs px-1 pt-4"}>{files.length} {files.length === 1 ? "image" : "images"}</div>
                </div>
            }
            <div className={"flex flex-col text-xs text-red-600 gap-1 px-1"}>{
                errors &&
                errors.map((err, i) => {
                    return(
                        <p key={i}>{err}</p>
                    )
                })
            }</div>
        </div>
    )
}

export default FileUpload