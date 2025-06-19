'use client'

import useSWR from "swr"
import { fetcher } from "@/app/utils/api"
import Spinner from "../loaders/Spinner"
import Error from "../errors/Error"
import AddressDisplay from "./AddressDisplay"

const AddressesContainer = () => {
    const { data: addresses, error: addressesError, isLoading: isAddressLoading, mutate } = useSWR<AddressInterface[]>('/users/address/all' , fetcher, {errorRetryInterval: 10000, errorRetryCount: 5})

    return(
        <div>
            {
                isAddressLoading ? <Spinner/> :
                addressesError ? <Error error={addressesError}/> :
                addresses && addresses.length === 0 ? <p className="text-center py-6 text-gray-800 text-sm">No addresses to show</p> :

                addresses && addresses.length > 0 &&
                <div className="flex flex-col gap-4 w-full divide-y divide-gray-300">
                    {
                        addresses.map(address => {
                            return(
                                <AddressDisplay 
                                    key={address.id}
                                    {...address}
                                    mutate={mutate}
                                />
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default AddressesContainer