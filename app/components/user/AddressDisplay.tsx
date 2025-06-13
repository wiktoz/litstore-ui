import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import api from "@/app/utils/api";

function splitBy3WithSpace(str: string): string {
    const parts = [];
    for (let i = 0; i < str.length; i += 3) {
        parts.push(str.slice(i, i + 3));
    }
    return parts.join(' ');
}

type AddressDisplayProps = AddressInterface & {
  mutate: any;
};

const AddressDisplay = ({id, name, surname, street, house, flat, post_code, city, phone, country, mutate}:AddressDisplayProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const deleteAddress = async () => {
        await api("/users/address/" + id, { 
            method: "DELETE"
        }).then(_ => {
            mutate()
        }).catch(_ => {

        })
    }

    return(
        <div className="py-4 flex gap-12 items-center">
            <div className="text-gray-600 text-sm w-2/5">
                <p className="font-semibold text-gray-900 mb-2">{name} {surname}</p>
                <p>{street} {house}{flat && ("/" + flat)}</p>
                <p>{post_code} {city}</p>
                <p>{country}</p>
            </div>
            <div className="w-1/5">
                <p className="text-gray-900 text-sm">+48 {splitBy3WithSpace(phone)}</p>
            </div>
            <div className="flex justify-end gap-2 grow">
                <PencilSquareIcon width={18} height={18} />
                <TrashIcon width={18} height={18} onClick={() => deleteAddress()} className="cursor-pointer hover:text-gray-500"/>
            </div>
        </div>
    )
}

export default AddressDisplay